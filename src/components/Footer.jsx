import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import BrandLogo from "../assets/BrandLogo.png";

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-[#f37f30] hover:text-white hover:border-[#f37f30] transition-all duration-200 shadow-sm"
  >
    {children}
  </a>
);

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="text-base text-slate-600 hover:text-[#f37f30] font-medium transition-colors duration-200"
  >
    {children}
  </a>
);

const LegalLink = ({ href, children }) => (
  <a
    href={href}
    className="text-base text-slate-600 hover:text-[#f37f30] font-medium transition-colors duration-200"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] text-[#1A1A1A] font-inter w-full">
      {/* Newsletter Section */}
      <div className="px-6 pt-12 pb-0 max-w-[75vw] mx-auto">
        <div className="bg-white/4 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Newsletter Content */}
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3 md:mb-4 text-[2.5rem]">
                Stay ahead with CodeMate.
              </h3>
              <p className="text-sm md:text-base text-[#1A1A1A] leading-relaxed">
                Join thousands of students who trust CodeMate for their career
                and placement prep.
              </p>
            </div>

            {/* Newsletter Visual */}
            <div className="hidden md:block relative rounded-2xl overflow-hidden">
              <img
                src="/images/footer-map.png"
                alt="Location Map"
                className="w-full h-full object-center rounded-2xl opacity-85"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className=" py-14 max-w-[80vw] mx-auto">
        <div className="flex justify-center items-center gap-20 md:gap-32 lg:gap-40 flex-wrap">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="mb-6 flex items-start">
              <img
                src={BrandLogo}
                alt="CodeMate Logo"
                className="w-56 md:w-64 object-contain self-start"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Instagram */}
              <SocialIcon href="https://www.instagram.com/codemate.nehu/" label="Instagram">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialIcon>

              {/* GitHub */}
              <SocialIcon href="https://github.com/CodeMate-Nehu/" label="GitHub">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </SocialIcon>

              {/* LinkedIn */}
              <SocialIcon href="https://www.linkedin.com/company/codematenehu" label="LinkedIn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-bold text-[#1A1A1A] mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#f37f30] flex-shrink-0" />
                <a
                  href="mailto:hello@codemate.com"
                  className="text-base text-slate-600 hover:text-[#f37f30] font-medium transition-colors duration-200"
                >
                  hello@codemate.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin size={20} className="text-[#f37f30] flex-shrink-0" />
                <address className="text-base text-slate-600 font-medium not-italic">
                  Shillong, Meghalaya, India
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#E5E5E5] border-t border-slate-300 py-6 w-full mt-8">
        <div className="max-w-[75vw] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-base text-slate-700 font-medium">
            &copy; 2025 CodeMate. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Terms of Service", "Privacy Policy", "Cookie Settings"].map(
              (label) => (
                <LegalLink key={label} href="#">
                  {label}
                </LegalLink>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
