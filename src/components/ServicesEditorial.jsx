'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck, School, Languages, Award, Plus } from 'lucide-react';

const BRAND_ORANGE = '#f26623';
const BRAND_BLUE = '#0d39b0';

const servicesData = [
  {
    id: 1,
    title: 'Visa Counselling',
    icon: FileCheck,
    description:
      'Expert guidance on visa applications, documentation, and interviews.',
    href: '/services/visa',
    base: BRAND_ORANGE,
  },
  {
    id: 2,
    title: 'University Admissions',
    icon: School,
    description:
      'Strategic advice on university selection and compelling personal statements.',
    href: '/services/admission',
    base: BRAND_BLUE,
  },
  {
    id: 3,
    title: 'Test Preparation',
    icon: Languages,
    description:
      'Training for IELTS, TOEFL, and PTE exams with experienced tutors.',
    href: '/services/test-prep',
    base: BRAND_ORANGE,
  },
  {
    id: 4,
    title: 'Scholarship Guidance',
    icon: Award,
    description:
      'Support in identifying and applying for scholarships and financial aid.',
    href: '/services/scholarships',
    base: BRAND_BLUE,
  },
];

function ServiceCard({ service }) {
  const IconComponent = service.icon;

  return (
    <Link
      href={service.href}
      className="
        block h-56 md:h-96 group relative overflow-hidden
        bg-[#F3F4F6] cursor-pointer
        transition-all duration-300
        lg:hover:-translate-y-1
      "
    >
      {/* SOLID BRAND BACKGROUND */}
      <div
        className="
          absolute inset-0 z-0
          transition-transform duration-500 ease-out
          translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0
        "
        style={{ backgroundColor: service.base }}
      />

      {/* CONTENT */}
      <div className="relative z-10 h-full p-4 md:p-8 flex flex-col justify-between transition-colors duration-300">
        {/* OVERVIEW BADGE
            Mobile: visible
            Desktop: hidden until hover
        */}
        <div
          className="
            absolute top-3 left-3 md:top-6 md:left-6
            transition-all duration-500 ease-out
            opacity-100
            lg:opacity-0 lg:group-hover:opacity-100
          "
        >
          <span
            className="inline-block text-[9px] md:text-[10px] font-bold px-2 py-1 tracking-widest uppercase bg-white"
            style={{ color: service.base }}
          >
            Overview
          </span>
        </div>

        {/* PLUS ICON
            Mobile: visible
            Desktop: visible (same behavior)
        */}
        <div
          className="
            absolute top-3 right-3 md:top-6 md:right-6
            p-1 md:p-2 rounded-full
            transition-all duration-500
            rotate-90
            lg:rotate-0 lg:group-hover:rotate-90
          "
        >
          <Plus className="w-4 h-4 md:w-6 md:h-6 text-white lg:text-gray-500 transition-colors duration-300 lg:group-hover:text-white" />
        </div>

        {/* CENTER AREA */}
        <div className="flex-grow flex flex-col justify-center items-center relative w-full text-center">
          {/* DESKTOP ICON */}
          <div className="hidden lg:block transition-all duration-500 ease-out transform group-hover:-translate-y-12 group-hover:opacity-0">
            <IconComponent
              strokeWidth={1}
              className="w-24 h-24 text-gray-700 transition-colors duration-300 group-hover:text-white"
            />
          </div>

          {/* DESKTOP DESCRIPTION */}
          <div
            className="
              hidden lg:block
              w-full text-left
              transition-all duration-500 ease-out
              opacity-0 translate-y-12
              group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            <p className="text-base font-medium leading-relaxed text-slate-900 transition-colors duration-300 group-hover:text-white">
              {service.description}
            </p>
          </div>

          {/* MOBILE: TITLE ONLY */}
          <h3 className="lg:hidden text-lg font-semibold text-white">
            {service.title}
          </h3>
        </div>

        {/* DESKTOP TITLE */}
        <div className="hidden lg:block mt-auto">
          <h3 className="text-xl font-medium text-center text-slate-900 transition-colors duration-300 group-hover:text-white">
            {service.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesEditorial() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-medium mb-8 md:mb-16 text-left tracking-tight text-slate-900">
          Services We Offer
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200">
          {servicesData.map((service) => (
            <div key={service.id} className="border-b border-r border-gray-200">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
