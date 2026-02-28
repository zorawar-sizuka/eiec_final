"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import ContactFormModern from "@/components/Contact2";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/contact/contact.avif"
            alt="Contact background - modern office space"
            fill
            className="object-cover brightness-[0.85]"
            priority
            quality={85}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

        <div className="relative z-10 flex h-full items-end justify-center pb-16 md:pb-24 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-white drop-shadow-lg"
          >
            Contact Us
          </motion.h1>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-20 lg:py-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20">
          {/* LEFT: Form */}
          <div className="lg:w-3/5 xl:w-7/12">
            <ContactFormModern />
          </div>

          {/* RIGHT: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-2/5 xl:w-5/12"
          >
            <div className="bg-[#F6F5F2] p-9 sm:p-10 lg:p-12 rounded-[2.5rem] h-full flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 mb-10">
                  Contact Information
                </h3>

                <div className="space-y-10">
                  {/* Head Office Address */}
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-white rounded-full shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                        Address
                      </span>
                      <p className="text-slate-900 leading-relaxed">
                        Putalisadak,<br />
                        Near Star Mall<br />
                        Kathmandu, 44600
                      </p>
                    </div>
                  </div>

                  {/* Branches */}
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-white rounded-full shrink-0">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 w-full">
                      <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                        Branches
                      </span>
                      {/* Increased desktop column gaps using sm:gap-x-12 and xl:gap-x-16 👇 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-y-3 gap-x-4 sm:gap-x-12 xl:gap-x-16 text-slate-900 text-[15px]">
                        {[
                          { city: "Itahari", phone: "9852073502" },
                          { city: "Lahan", phone: "9816845377" },
                          { city: "Rajbiraj", phone: "9707081801" },
                          { city: "Dharan", phone: "9705078902" },
                          { city: "Pokhara", phone: "061-591175" },
                          { city: "Lalitpur", phone: "01-5402052" },
                        ].map((branch) => (
                          <div
                            key={branch.city}
                            // Replaced complex justify classes with a simple justify-start gap-2 👇
                            className="flex items-center justify-start gap-2"
                          >
                            {/* Added colon and removed fixed width 👇 */}
                            <span className="font-medium shrink-0">{branch.city}:</span>
                            <a
                              href={`tel:${branch.phone.replace(/-/g, "")}`}
                              className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap"
                            >
                              {branch.phone}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-white rounded-full shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                        Email
                      </span>
                      <a
                        href="mailto:info@espotinternational.com"
                        className="text-slate-900 hover:text-blue-600 transition-colors block break-all whitespace-nowrap"
                      >
                        info@espotinternational.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-white rounded-full shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                        Phone
                      </span>
                      <p className="text-slate-900">01-5332391</p>
                      <p className="text-slate-500 text-sm mt-1.5">
                        Sun–Fri, 9:00 AM – 5:00 PM Nepal Time
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-10 border-t border-slate-200">
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                  Follow Us
                </span>
                <div className="flex flex-wrap gap-6">
                  {[
                    { name: "Email", href: "mailto:info@espotinternational.com" },
                    { name: "Facebook", href: "https://www.facebook.com/espotinternational/" },
                    { name: "Instagram", href: "https://www.instagram.com/espotinternational/" },
                    { name: "TikTok", href: "https://www.tiktok.com/@espotinternational" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.name === "Email" ? undefined : "_blank"}
                      rel={item.name === "Email" ? undefined : "noopener noreferrer"}
                      className="text-slate-800 font-medium hover:text-blue-600 transition-colors underline underline-offset-4 decoration-slate-300 hover:decoration-blue-400 text-sm"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAP */}
      <section className="w-full h-[45vh] sm:h-[50vh] lg:h-[60vh] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d28276.89595041781!2d85.32459519999999!3d27.636531199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x39eb195edfebae89%3A0x94daed854bd39213!2sEspot%20International%20Education%20Consultancy%2C%20Near%20by%20Star%20Mall%2C%20Hattisar%20Rd%2C%20Kathmandu%2044600!3m2!1d27.7075171!2d85.3224211!5e0!3m2!1sen!2snp!4v1769848329397!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[0.35] contrast-[1.03]"
        />
      </section>
    </div>
  );
}