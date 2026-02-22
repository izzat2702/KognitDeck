import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // @next-auth/prisma-adapter is the correct adapter for next-auth v4.
  // (@auth/prisma-adapter is for Auth.js v5 and breaks the OAuth callback in v4.)
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On first sign-in `user` is populated by the adapter.
      if (user) {
        token.id = user.id;
        // Seed plan/onboarding from the DB user so we don't need an extra
        // round-trip on the very first request.
        token.plan = (user as { plan?: string }).plan ?? "free";
        token.onboardingCompleted =
          (user as { onboardingCompleted?: boolean }).onboardingCompleted ?? false;
      }

      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      // Refresh plan/onboarding on subsequent requests.
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { plan: true, onboardingCompleted: true },
          });
          if (dbUser) {
            token.plan = dbUser.plan;
            token.onboardingCompleted = dbUser.onboardingCompleted;
          }
        } catch {
          // DB temporarily unavailable — keep the values already on the token
          // so the session callback doesn't receive undefined and crash.
          token.plan = token.plan ?? "free";
          token.onboardingCompleted = token.onboardingCompleted ?? false;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.plan = (token.plan as string) ?? "free";
        session.user.onboardingCompleted =
          (token.onboardingCompleted as boolean) ?? false;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function hashPassword(password: string) {
  return hash(password, 12);
}
