// 'use client';

// import React from 'react';
// import Link from 'next/link';


// const Footer = () => {
//   // Data structure tailored for Education Consultancy
//   const footerSections = [
//     {
//       title: "Company",
//       links: [
//         { name: "About Us", href: "/about" },
//         { name: "Events", href: "/events" },
//         { name: "Contact Us", href: "/contact" }, 
//         { name: "Our Vision", href: "/vision" },
//       ],
//     },
//     {
//       title: "Student Services",
//       links: [
//         { name: "Admission Counseling", href: "/services/admission" },
//         { name: "Language Prep.(IELTS/PTE)", href: "/services/test-prep" },
//         { name: "Visa Assistance", href: "/services/visa" },
//         { name: "Scholarship Guidance", href: "/services/scholarships" },
//       ],
//     },
//     {
//       title: "Study Destinations",
//       links: [
//         { name: "Study in USA", href: "/countries/usa" },
//         { name: "Study in UK", href: "/countries/uk" },
//         { name: "Study in Canada", href: "/countries/canada" },
//         { name: "Study in Australia", href: "/countries/australia" }, 
//         { name: "Study in Germany", href: "/countries/germany" }, 
//         { name: "Study in Japan", href: "/countries/japan" }, 
//         { name: "Study in New Zealand", href: "/countries/new-zealand" },
//       ],
//     }, 
//     {
//         title: "Utilities",
//         links: [ 
//          { name: "AI Tools", href: "/tools" },
//           { name: "Resources", href: "/resources" },
//         ],
//       },
//     {
//       title: "Appendix",
//       links: [
//         { name: "FAQs", href: "/appendix/faqs" },
//         { name: "Privacy Policy", href: "/appendix/privacy-policy" },
//         { name: "Terms & Conditions", href: "/appendix/t&c" },
//       ],
//     },
//   ];

//   return (
//     <footer className="bg-white text-gray-900 border-t border-gray-200">
//       <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-16 pb-8">
        
//         {/* Main Grid Section */}
//         <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-y-12 gap-x-5 mb-16">
          
//           {/* Loop through the link sections */}
//           {footerSections.map((section, index) => (
//             <div key={index} className="flex flex-col space-y-4">
//               <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">
//                 {section.title}
//               </h3>
//               <ul className="space-y-3 text-sm font-medium">
//                 {section.links.map((link, linkIndex) => (
//                   <li key={linkIndex}>
//                     <Link 
//                       href={link.href} 
//                       className="hover:text-blue-600 transition-colors duration-200 block"
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           {/* Social / Contact Column (Right Aligned on Desktop) */} 


//           <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pl-8 lg:border-l border-gray-200">
//             <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">
//               Connect
//             </h3>
            
//             {/* Social Icons Flex Container */}
//             <div className="flex flex-wrap items-center gap-6 text-gray-900">
              
//               {/* Mail Icon - Opens Default Mail Client */}
//               <a 
//                 href="mailto:info@espotinternational.com" 
//                 className="hover:text-blue-600 transition-colors"
//                 aria-label="Email Us"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
//                 </svg>
//               </a>
              
//               {/* Instagram - Added https:// and target blank */}
//               <a 
//                 href="https://www.instagram.com/espotinternational/" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="hover:text-pink-600 transition-colors"
//                 aria-label="Instagram"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
//                 </svg>
//               </a>

//               {/* Facebook - New Addition */}
//               <a 
//                 href="https://www.facebook.com/espotinternational/" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="hover:text-blue-700 transition-colors"
//                 aria-label="Facebook"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
//                 </svg>
//               </a>

//               {/* TikTok - New Addition */}
//               <a 
//                 href="https://www.tiktok.com/@espotinternational"
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="hover:text-black transition-colors"
//                 aria-label="TikTok"
//               >
//                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
//                  </svg>
//               </a>

//             </div>
            
//             {/* Quick Contact Info */}
//             <div className="mt-6 text-xs text-gray-500 space-y-1">
//               <p>01-5332391</p>
//               <p>Hattisar Road, Putalisadak Near Star Mall, Kathmandu</p>
//             </div>
//           </div> 


//         </div>

//         {/* Bottom Bar: Logo & Copyright */}
//         <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          
//           {/* Updated Brand Logo */}
//           <div className="text-xl font-serif font-bold tracking-tight text-gray-900">
//             EIEC<span className="text-blue-600">.</span>
//           </div>

//           {/* Copyright */}
//           <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-bold tracking-wider text-gray-500 uppercase">
//              <Link href="/appendix/privacy-policy" className="hover:text-gray-900">Privacy</Link>
//              <Link href="/appendix/t&c" className="hover:text-gray-900">Terms</Link>
//              <span>© {new Date().getFullYear()}. All rights reserved.</span>
//           </div>
//         </div>

//       </div>    
//     </footer>
//   );
// };

// export default Footer;





'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  // Data structure tailored for Education Consultancy
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Events", href: "/events" },
        { name: "Contact Us", href: "/contact" },
        { name: "Our Vision", href: "/vision" },
      ],
    },
    {
      title: "Student Services",
      links: [
        { name: "Admission Counseling", href: "/services/admission" },
        { name: "Language Prep.(IELTS/PTE)", href: "/services/test-prep" },
        { name: "Visa Assistance", href: "/services/visa" },
        { name: "Scholarship Guidance", href: "/services/scholarships" },
      ],
    },
    {
      title: "Study Destinations",
      links: [
        { name: "Study in USA", href: "/countries/usa" },
        { name: "Study in UK", href: "/countries/uk" },
        { name: "Study in Canada", href: "/countries/canada" },
        { name: "Study in Australia", href: "/countries/australia" },
        { name: "Study in Germany", href: "/countries/germany" },
        { name: "Study in Japan", href: "/countries/japan" },
        { name: "Study in New Zealand", href: "/countries/new-zealand" },
      ],
    },
    {
      title: "Utilities",
      links: [
        { name: "AI Tools", href: "/tools" },
        { name: "Resources", href: "/resources" },
      ],
    },
    {
      title: "Appendix",
      links: [
        { name: "FAQs", href: "/appendix/faqs" },
        { name: "Privacy Policy", href: "/appendix/privacy-policy" },
        { name: "Terms & Conditions", href: "/appendix/t&c" },
      ],
    },
  ];

  const branches = [
    { city: "Itahari", phone: "9852073502" },
    { city: "Lahan", phone: "9816845377" },
    { city: "Rajbiraj", phone: "9707081801" },
    { city: "Dharan", phone: "9705078902" },
    { city: "Pokhara", phone: "061-591175" },
    { city: "Lalitpur", phone: "01-5402052" },
  ];

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-16 pb-10">
        
        {/* Main Grid Section */}
        {/* Changed lg:grid-cols-6 to lg:grid-cols-7 to give the right column more room */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-y-12 gap-x-6 mb-16">
          
          {/* Link Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm font-medium">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="hover:text-blue-600 transition-colors duration-200 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Quick Contact + Social Column */}
          {/* Gave this column slightly more width on large screens (col-span-2) */}
          <div className="col-span-2 sm:col-span-3 md:col-span-5 lg:col-span-2 lg:pl-8 lg:border-l border-gray-200">
            <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
              Connect
            </h3>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-900">
              <a href="mailto:info@espotinternational.com" className="hover:text-blue-600 transition-colors" aria-label="Email Us">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
              <a href="https://www.instagram.com/espotinternational/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="https://www.facebook.com/espotinternational/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.tiktok.com/@espotinternational" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
            </div>

            {/* Quick Contact Info */}
            <div className="text-sm text-gray-600 space-y-6">
              
              {/* Head Office */}
              <div>
                <p className="font-bold text-gray-900 mb-1">Head Office</p>
                <div className="flex flex-col gap-0.5">
                  <a href="tel:015332391" className="hover:text-blue-600 transition-colors inline-block w-fit">01-5332391</a>
                  <p>Hattisar Road, Putalisadak, Near Star Mall</p>
                  <p>Kathmandu, 44600</p>
                </div>
              </div>

              {/* Branches */}
              <div>
                <p className="font-bold text-gray-900 mb-2">Branches</p>
                {/* 1 col on mobile, 2 col on tablet, 1 col on desktop (to fit the panel) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-y-2 gap-x-6 text-gray-600">
                  {branches.map((branch) => (
                    <div key={branch.city} className="flex justify-between items-center border-b border-gray-100 sm:border-none pb-1 sm:pb-0">
                      <span className="font-medium mr-3">{branch.city}</span>
                      <a
                        href={`tel:${branch.phone.replace(/-/g, '')}`}
                        className="hover:text-blue-600 transition-colors whitespace-nowrap"
                      >
                        {branch.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="text-xl font-serif font-bold tracking-tight text-gray-900">
            EIEC<span className="text-blue-600">.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 uppercase tracking-wider font-bold">
            <Link href="/appendix/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="/appendix/t&c" className="hover:text-gray-900 transition-colors">Terms</Link>
            <span>© {new Date().getFullYear()}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;