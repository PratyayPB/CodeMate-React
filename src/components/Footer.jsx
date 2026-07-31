import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import BrandLogo from "../assets/BrandLogo.png";

const InstagramIcon = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const DiscordIcon = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const LinkedinIcon = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const WhatsappIcon = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.197 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.526-8.41" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white text-zinc-900 font-sans border-t border-zinc-200/60 w-full pt-16 pb-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16">
          {/* Left Column (Brand, Address, Contact) */}
          <div className="md:col-span-5 lg:col-span-4 space-y-8">
            {/* Logo */}
            <div>
              <Link to="/">
                <img
                  src={BrandLogo}
                  alt="CodeMate Logo"
                  className="w-48 md:w-56 object-contain"
                />
              </Link>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <h5 className="font-heading text-sm font-semibold text-zinc-900 tracking-wide">
                Address
              </h5>
              <p className="text-sm text-zinc-600 font-normal">
                SoT, NEHU, Shillong
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-1">
              <h5 className="font-heading text-sm font-semibold text-zinc-900 tracking-wide">
                Contact
              </h5>
              <a
                href="mailto:codemate.nehu@gmail.com"
                className="text-sm text-zinc-600 hover:text-brand-primary transition-colors font-normal block"
              >
                codemate.nehu@gmail.com
              </a>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="md:col-span-3 lg:col-span-3 grid grid-cols-2 gap-4 items-start pt-2 md:pt-0">
            {/* Column 1 */}
            <div className="space-y-3.5 flex flex-col">
              <Link
                to="/"
                className="text-sm sm:text-base text-zinc-700 hover:text-brand-primary font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/Resources"
                className="text-sm sm:text-base text-zinc-700 hover:text-brand-primary font-medium transition-colors"
              >
                Resources
              </Link>
              <Link
                to="/Alumni"
                className="text-sm sm:text-base text-zinc-700 hover:text-brand-primary font-medium transition-colors"
              >
                Alumni
              </Link>
              <Link
                to="/events"
                className="text-sm sm:text-base text-zinc-700 hover:text-brand-primary font-medium transition-colors"
              >
                Events
              </Link>
            </div>

            {/* Column 2 */}
            <div className="space-y-3.5 flex flex-col">
              <Link
                to="/contact"
                className="text-sm sm:text-base text-zinc-700 hover:text-brand-primary font-medium transition-colors"
              >
                Contact us
              </Link>
              <a
                href="/#about"
                className="text-sm sm:text-base text-zinc-700 hover:text-brand-primary font-medium transition-colors"
              >
                About us
              </a>

              <a
                href="https://linktr.ee/codemate_club_nehu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-zinc-700 hover:text-brand-primary font-medium transition-colors"
              >
                Join us
              </a>
            </div>
          </div>

          {/* Map Column */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-start">
            <a
              href="https://maps.google.com/?q=School+of+Technology+NEHU+Shillong"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative overflow-hidden rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src="/images/footer-map.png"
                alt="School of Technology, NEHU Shillong Map"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-zinc-300 w-full" />

        {/* Bottom Bar Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-600 font-normal">
          <div>@2026 CodeMate. All rights reserved</div>
          <div className="flex items-center gap-5 text-zinc-900">
            <a
              href="mailto:codemate.nehu@gmail.com"
              aria-label="Mail"
              className="hover:text-brand-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Mail size={22} />
            </a>
            <a
              href="https://discord.com/invite/XkQx7eXBv9"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="hover:text-brand-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <DiscordIcon size={22} />
            </a>
            <a
              href="https://www.instagram.com/codemate.nehu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-brand-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <InstagramIcon size={22} />
            </a>
            <a
              href="https://www.linkedin.com/company/codematenehu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-brand-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <LinkedinIcon size={22} />
            </a>
            <a
              href="https://chat.whatsapp.com/HtXvYO1BDeH9NY4vSj3DZ4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-brand-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <WhatsappIcon size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
