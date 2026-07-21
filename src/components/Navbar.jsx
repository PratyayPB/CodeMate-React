/*
 * Navbar.jsx
 * Sticky header navigation with a responsive mobile menu toggle,
 * backdrop blur, brand logo SVG, navigation links, and CTA button.
 * Accepts currentPage and setCurrentPage props to manage active page view.
 */
import { useState } from "react";
import { Menu, X, Hexagon } from "lucide-react";
import Button from "./Button";
import Logo from "../assets/BrandLogo.png";
const Navbar = ({ currentPage = "resources", setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "alumni" },
    { name: "Resources", id: "resources" },
    { name: "Events", id: "events" },
    { name: "Community", id: "community" },
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (id === "resources" || id === "alumni") {
      setCurrentPage(id);
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-brand-dark/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage("alumni")}
          >
            <img src={Logo} alt="Brand Logo" width={150} height={150} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`font-heading text-lg font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-brand-primary underline underline-offset-4 decoration-2 transition duration-300 ease-in-out hover:text-brand-primary-dark"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="light"
              size="md"
              className="transition-transform duration-200 hover:scale-105"
            >
              Connect
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-zinc-200 bg-brand-dark ${
          isOpen
            ? "max-h-72 opacity-100 py-4"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-100 text-brand-primary"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-4 px-3">
            <Button variant="light" size="md" fullWidth>
              Connect
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
