import React, { useState, useEffect, useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import gsap from "gsap";

const memberGroups = {
  founders: {
    title: 'the <span class="accent">founders</span>',
    subheading: "who laid the vision behind the community",
    members: [
      {
        name: "Abhishek Kumar Rai",
        role: "Founder",
        desc: "BTSA at ZS, Data & AI, GATE Qualified x3, Ex-Organizer at GDGoC, Gold Medalist at NEHU.",
        linkedin: "https://www.linkedin.com/in/abhishek-kumar-rai-6b46a6269/",
        email: "abhishek@codemate.com",
        github: "#",
        imageSrc: "images/founders/akb.jpg.jpeg",
        thumbnailSrc: "images/founders/akbt.png",
      },
      {
        name: "Harsh Pandey",
        role: "Founder",
        desc: "Software Engineer at Pursuit Software | SSB recommended AIR15 | GATE 2024,25 | Cricket lover.",
        linkedin: "https://www.linkedin.com/in/22harshpandey/",
        email: "harsh@codemate.com",
        github: "#",
        imageSrc: "images/founders/harsh.png",
        thumbnailSrc: "images/founders/hpt.png",
      },
      {
        name: "Abhi Nitnaware",
        role: "Founder",
        desc: "Technical pioneer focusing on resource development and innovation.",
        linkedin: "https://www.linkedin.com/in/abhi-nitnaware/",
        email: "abhi@codemate.com",
        github: "#",
        imageSrc: "images/founders/an.png",
        thumbnailSrc: "images/founders/ant.png",
      },
    ],
  },
  teachers: {
    title: 'the <span class="accent">teacher co-ordinators</span>',
    subheading: "who guide us with experience and mentorship",
    members: [
      {
        name: "Dr. Arnab Kumar Maji",
        role: "Coordinator",
        desc: "Academic advisor providing deep insights into research and excellence.",
        linkedin: "#",
        email: "arnab@codemate.com",
        github: "#",
        imageSrc: "images/teacher_coordinator/it.png",
        thumbnailSrc: "images/teacher_coordinator/itt.png",
      },
      {
        name: "Prof. Sirsendu Sekhar Ray",
        role: "Coordinator",
        desc: "Mentorship lead fostering student growth through expert guidance.",
        linkedin: "#",
        email: "sirsendu@codemate.com",
        github: "#",
        imageSrc: "images/teacher_coordinator/bme.png",
        thumbnailSrc: "images/teacher_coordinator/bmet.png",
      },
      {
        name: "Mr. Asif Ahmed",
        role: "Coordinator",
        desc: "Industry liaison bridging the gap between academia and career.",
        linkedin: "#",
        email: "asif@codemate.com",
        github: "#",
        imageSrc: "images/teacher_coordinator/ece.png",
        thumbnailSrc: "images/teacher_coordinator/ecet.png",
      },
    ],
  },
  leads: {
    title: 'the <span class="accent">builders</span>',
    subheading: "who are making everything happen",
    members: [
      {
        name: "Bandeep Bhatta",
        role: "Club Lead",
        subgroup: "Leads",
        desc: "Driving overall club strategy and community engagement.",
        linkedin: "https://www.linkedin.com/in/bandeep-bhatta/",
        email: "bandeep@codemate.com",
        github: "#",
        imageSrc: "images/team/biku_p.jpeg",
        thumbnailSrc: "images/team/biku_t.png",
      },
      {
        name: "Nikunj Maheshwari",
        role: "Ops & Strategy",
        subgroup: "Leads",
        desc: "Managing operations and long-term strategic growth.",
        linkedin: "https://www.linkedin.com/in/nikunjm111/",
        email: "nikunjnehu@gmail.com",
        github: "#",
        imageSrc: "images/team/nikunjmaheshwari_p.jpeg",
        thumbnailSrc: "images/team/nikunjmaheshwari_t.png",
      },
      {
        name: "Soumojit Bhuin",
        role: "Tech Lead",
        subgroup: "Leads",
        desc: "Overseeing technical infrastructure and project development.",
        linkedin: "https://www.linkedin.com/in/soumojit-bhuin-313328345",
        email: "soumojit@codemate.com",
        github: "https://www.linkedin.com/in/soumojit-bhuin-313328345/",
        imageSrc: "images/team/soumojit_p.png",
        thumbnailSrc: "images/team/soumojit_t.png",
      },
      {
        name: "Anurag Saud",
        role: "Full-Stack Developer",
        subgroup: "Tech Team",
        desc: "Maintains full-stack systems and CodeMate's Discord.",
        linkedin: "https://www.linkedin.com/in/anuragsaud/",
        email: "anurag@codemate.com",
        github: "#",
        imageSrc: "images/team/anurag_p.jpeg",
        thumbnailSrc: "images/team/anurag_t.png",
      },
      {
        name: "Pratyay Pratim Borah",
        role: "Frontend Developer",
        subgroup: "Tech Team",
        desc: "Develops scalable web interfaces and optimizes UX.",
        linkedin: "https://www.linkedin.com/in/pratyaypratimborah/",
        email: "pratyay@codemate.com",
        github: "#",
        imageSrc: "images/team/pratyay_p.jpeg",
        thumbnailSrc: "images/team/pratyay_t.jpeg",
      },
      {
        name: "Vaivbhav Papney",
        role: "CP Enthusiast",
        subgroup: "Tech Team",
        desc: "Supports technical projects and maintains documentation.",
        linkedin: "https://www.linkedin.com/in/vaibhavpapney/",
        email: "vaivbhav@codemate.com",
        github: "#",
        imageSrc: "images/team/vaibhav_p.png",
        thumbnailSrc: "images/team/vaibhav_t.png",
      },
      {
        name: "Sazeed Taj",
        role: "Web Designer",
        subgroup: "Tech Team",
        desc: "Designs web layouts and ensures brand visual consistency.",
        linkedin: "https://www.linkedin.com/in/sazeedtaj/",
        email: "sazeed@codemate.com",
        github: "#",
        imageSrc: "images/team/sazeed_p.jpeg",
        thumbnailSrc: "images/team/sazeed_t.jpeg",
      },
      {
        name: "Rishita Kashyap",
        role: "Community Engagement Coordinator",
        subgroup: "Event Management Team",
        desc: "Drives event promotion, sponsor outreach, and Instagram growth.",
        linkedin: "https://www.linkedin.com/in/rishitakashyap/",
        email: "rishita@codemate.com",
        github: "#",
        imageSrc: "images/team/rishita_p.jpeg",
        thumbnailSrc: "images/team/rishita_t.jpeg",
      },
      {
        name: "Disha Saha",
        role: "Documentation Coordinator",
        subgroup: "Event Management Team",
        desc: "Captures and organizes event moments through visual storytelling.",
        linkedin: "https://www.linkedin.com/in/disha-saha-21549a41b/",
        email: "disha@codemate.com",
        github: "#",
        imageSrc: "images/team/disha_p.jpeg",
        thumbnailSrc: "images/team/disha_t.jpeg",
      },
      {
        name: "Chandrasmita Gayan",
        role: "Graphic Designer",
        subgroup: "Event Management Team",
        desc: "Creates event graphics, manages LinkedIn, and assists with Instagram.",
        linkedin: "https://www.linkedin.com/in/chandrasmitagayan/",
        email: "chandrasmita@codemate.com",
        github: "#",
        imageSrc: "images/team/chandrasmita_p.jpeg",
        thumbnailSrc: "images/team/chandrasmita_t.jpeg",
      },
      {
        name: "Deepanshu Das",
        role: "Graphic Designer",
        subgroup: "Event Management Team",
        desc: "Creates event graphics, handles photo coverage, and assists with Instagram.",
        linkedin: "https://www.linkedin.com/in/deepanshu-das/",
        email: "deepanshu@codemate.com",
        github: "#",
        imageSrc: "images/team/deepanshu_p.jpeg",
        thumbnailSrc: "images/team/deepanshu_t.jpeg",
      },
      {
        name: "Krish Das",
        role: "Content Manager",
        subgroup: "Event Management Team",
        desc: "Creates promotional videos and builds CodeMate's Instagram presence.",
        linkedin: "https://www.linkedin.com/in/krish-das-223282280/",
        email: "krish@codemate.com",
        github: "#",
        imageSrc: "images/team/krish_p.jpeg",
        thumbnailSrc: "images/team/krish_t.jpeg",
      },
    ],
  },
};

const navItems = [
  { id: "founders", label: "Founders" },
  { id: "teachers", label: "Teachers" },
  { id: "leads", label: "Builders" },
];

const Members = () => {
  const [currentGroup, setCurrentGroup] = useState("founders");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  useScrollReveal([currentGroup, isDesktop]);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const group = memberGroups[currentGroup];
  const members = group.members;
  const activeMember = members[currentIndex];

  // Determine whether to show the grid view
  const showGrid = currentGroup === "leads" && isDesktop;

  const transitionContent = (callback) => {
    const targets = showGrid
      ? contentRef.current
      : [
          contentRef.current.querySelector(".ts-main-image"),
          contentRef.current.querySelector(".ts-text-content"),
        ];

    gsap.to(targets, {
      opacity: 0,
      y: 10,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        callback();
        gsap.fromTo(
          targets,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        );
      },
    });
  };

  const handleGroupChange = (groupId) => {
    if (groupId === currentGroup) return;
    const mainContent = contentRef.current.closest(".members-display");

    gsap.to(mainContent, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setCurrentGroup(groupId);
        setCurrentIndex(0);

        // If switching to mobile view, scroll up slightly to ensure header is visible
        if (window.innerWidth <= 768) {
          const membersHeader = document.getElementById("members-header-wrap");
          if (membersHeader) {
            const y =
              membersHeader.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }

        gsap.fromTo(
          mainContent,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        );
      },
    });
  };

  const handleNext = () => {
    transitionContent(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    });
  };

  const handlePrev = () => {
    transitionContent(() => {
      setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
    });
  };

  const handleThumbClick = (idx) => {
    transitionContent(() => {
      setCurrentIndex(idx);
    });
  };

  const getThumbnails = () => {
    const numThumbnails = Math.min(2, Math.max(0, members.length - 1));
    const thumbs = [];
    for (let i = 1; i <= numThumbnails; i++) {
      const idx = (currentIndex + i) % members.length;
      thumbs.push({ ...members[idx], originalIndex: idx });
    }
    return thumbs;
  };

  return (
    <section id="members" className="section members-section">
      <div className="container">
        <div id="members-header-wrap" className="members-header">
          <span className="section-tagline members-tagline reveal">
            OUR PEOPLE
          </span>
          <h2
            id="members-heading"
            className="section-title reveal"
            dangerouslySetInnerHTML={{ __html: group.title }}
          ></h2>
          <p id="members-subheading" className="section-subtitle-members">
            {group.subheading}
          </p>
        </div>

        <div className="members-layout">
          {/* Sidebar Navigation */}
          <div className="members-sidebar">
            <div id="members-nav" className="members-nav-vertical">
              {navItems
                .filter((item) => item.id !== currentGroup)
                .map((item) => (
                  <button
                    key={item.id}
                    className="member-nav-btn"
                    onClick={() => handleGroupChange(item.id)}
                  >
                    <span className="nav-btn-label">SWITCH TO</span>
                    <span className="nav-btn-name">{item.label}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="members-display">
            <div
              id="members-active-grid"
              className="members-slider-wrap reveal"
              ref={contentRef}
            >
              {showGrid ? (
                <div className="members-view-all-container">
                  <div className="members-grid">
                    {members.map((member, i) => (
                      <div key={i} className="member-card reveal">
                        <div className="member-card-img-wrap">
                          <img
                            src={`/${member.imageSrc}`}
                            alt={member.name}
                            className="member-card-img"
                          />
                        </div>
                        <div className="member-info">
                          <h3>{member.name}</h3>
                          <span className="role">{member.role}</span>
                        </div>
                        <p className="member-desc">{member.desc}</p>
                        <div className="member-links">
                          <a
                            href={member.linkedin}
                            className="member-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i
                              className="fa-brands fa-linkedin-in"
                              style={{ fontSize: "20px" }}
                            ></i>
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="member-link"
                          >
                            <Mail size={20} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="testimonial-slider-container">
                  {currentGroup === "leads" && (
                    <button
                      onClick={() => console.log("View All clicked")}
                      className="view-all-btn-circular"
                    >
                      <span className="view-all-text">view All</span>
                    </button>
                  )}
                  <div className="ts-left-col">
                    <div className="ts-meta">
                      <span className="ts-pagination">
                        {String(currentIndex + 1).padStart(2, "0")} /{" "}
                        {String(members.length).padStart(2, "0")}
                      </span>
                      <h2 className="ts-vertical-text">Members</h2>
                    </div>
                    <div className="ts-thumbnails">
                      {getThumbnails().map((member, i) => (
                        <button
                          key={i}
                          onClick={() => handleThumbClick(member.originalIndex)}
                          className="slider-thumb-btn"
                        >
                          <img
                            src={`/${member.thumbnailSrc}`}
                            alt={member.name}
                            className="slider-thumb-img"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="ts-center-col">
                    <img
                      src={`/${activeMember.imageSrc}`}
                      alt={activeMember.name}
                      className="ts-main-image ts-main-image-anim"
                    />
                  </div>
                  <div className="ts-right-col">
                    <div className="ts-text-content ts-text-content-anim">
                      <p className="ts-role">{activeMember.role}</p>
                      <h3 className="ts-name">{activeMember.name}</h3>
                      <blockquote className="ts-quote">
                        "{activeMember.desc}"
                      </blockquote>
                      <div
                        className="member-links ts-contact-icons"
                        style={{ marginTop: "2rem" }}
                      >
                        <a
                          href={activeMember.linkedin}
                          className="member-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa-brands fa-linkedin-in"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </a>
                        <a
                          href={`mailto:${activeMember.email}`}
                          className="member-link"
                        >
                          <Mail size={20} />
                        </a>
                      </div>
                    </div>
                    <div className="ts-nav-buttons">
                      <button onClick={handlePrev} className="ts-nav-btn">
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        onClick={handleNext}
                        className="ts-nav-btn ts-nav-btn-primary"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Members;
