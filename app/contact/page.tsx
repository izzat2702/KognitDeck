"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, Clock, HeadphonesIcon } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      label: "Email Us",
      value: "support@kognitdeck.app",
      sub: "We read every message",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      label: "Response Time",
      value: "Within 24 hours",
      sub: "Usually much faster",
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6 text-blue-600" />,
      label: "Support Hours",
      value: "Mon to Fri, 9am to 6pm",
      sub: "UK time (GMT/BST)",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-5">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            We would love to hear from you
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you have a question, a feature request, or just want to share feedback, our
            team is here and happy to help.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 flex-1">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {submitted ? (
              <Card className="border border-green-100 shadow-sm">
                <CardContent className="pt-12 pb-12 px-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h2>
                  <p className="text-gray-600 max-w-sm leading-relaxed">
                    Thank you for reaching out. A member of our team will get back to you within 24
                    hours. We will reply from support@kognitdeck.app.
                  </p>
                  <Button
                    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="pt-8 pb-8 px-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What is your message about?"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more..."
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="border-gray-200 focus:border-blue-500 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {contactInfo.map((info) => (
              <Card key={info.label} className="border border-gray-100 shadow-sm">
                <CardContent className="pt-6 pb-6 px-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">{info.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        {info.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">{info.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{info.sub}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border border-blue-100 bg-blue-50 shadow-sm">
              <CardContent className="pt-6 pb-6 px-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">Looking for help docs?</p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Check our FAQ for instant answers to common questions about billing,
                  card generation, and account management.
                </p>
                <a
                  href="/faq"
                  className="inline-block mt-3 text-xs font-semibold text-blue-600 hover:underline"
                >
                  Browse FAQ &rarr;
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
