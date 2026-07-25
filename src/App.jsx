import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import StaggeredMenu from "./components/ui/StaggeredMenu";
import Logo from "./assets/BrandLogo.png";
import LandingPage from "./pages/LandingPage";
import Resources from "./pages/Resources";
import Alumni from "./pages/Alumni";
import AlumniViewAll from "./pages/AlumniViewAll";
import EventsPage from "./pages/EventsPage";
import NotFound from "./pages/NotFound";

import Footer from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const navigate = useNavigate();

  const handleNavClick = (route, sectionId) => {
    setCurrentPage(route);
    navigate(route);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center  justify-between">
      <div>
        <StaggeredMenu
          position="right"
          isFixed={true}
          items={[
            {
              label: "Home",
              ariaLabel: "Go to home page",
              link: "#home",
              onClick: () => handleNavClick("/", "home"),
            },
            {
              label: "Resources",
              ariaLabel: "View resources",
              link: "#",
              onClick: () => handleNavClick("/Resources"),
            },
            {
              label: "Alumni",
              ariaLabel: "View alumni",
              link: "#",
              onClick: () => handleNavClick("/Alumni"),
            },
            {
              label: "Events",
              ariaLabel: "View events",
              link: "#",
              onClick: () => handleNavClick("/events"),
            },
            {
              label: "Community",
              ariaLabel: "Join community",
              link: "#impact",
              onClick: () => handleNavClick("/", "impact"),
            },
          ]}
          socialItems={[
            { label: "Instagram", link: "https://instagram.com/codemate.nehu" },
            { label: "GitHub", link: "https://github.com/CodeMate-Nehu" },
            {
              label: "LinkedIn",
              link: "https://www.linkedin.com/company/codematenehu/",
            },
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#1f2937"
          openMenuButtonColor="#1f2937"
          changeMenuColorOnOpen={true}
          colors={["#ffedd5", "#f37f30"]}
          logoUrl={Logo}
          accentColor="#f37f30"
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Alumni" element={<Alumni />} />
          <Route path="/AlumniViewAll" element={<AlumniViewAll />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
