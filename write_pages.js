const fs = require("fs");
const base = "C:/claude27/Flashcardv1/app";
const lines = [];
// ---- FAQ PAGE ----
const faq = [];
faq.push(`import { Navbar } from "@/components/layout/Navbar";`);
faq.push(`import { Footer } from "@/components/layout/Footer";`);
faq.push(`import { Button } from "@/components/ui/button";`);
faq.push(`import {`);
faq.push(`  Accordion,`);
faq.push(`  AccordionContent,`);
faq.push(`  AccordionItem,`);
faq.push(`  AccordionTrigger,`);
faq.push(`} from "@/components/ui/accordion";`);
faq.push(`import { HelpCircle, MessageCircle } from "lucide-react";`);
faq.push(`import Link from "next/link";`);
faq.push(``);
faq.push(`const faqSections = [`);
