gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
document.addEventListener('DOMContentLoaded', () => {
  // ── 1. CORE SETUP & COMPONENT LOADING ──
  const components = [
    { id: 'navbar-container', path: '../components/navbar.html' },
    { id: 'footer-container', path: '../components/footer.html' },
    { id: 'chatbot-container', path: '../components/chatbot.html' }
  ];

  async function loadComponent(component) {
    try {
      const response = await fetch(component.path);
      if (!response.ok) throw new Error(`Failed to load ${component.path}`);
      let html = await response.text();
      // Adjust relative logo/image paths for subfolder structure
      html = html.replace(/src="images\//g, 'src="../images/');
      document.getElementById(component.id).innerHTML = html;
    } catch (error) {
      console.error("Component Load Error:", error);
    }
  }

  function initNavbar() {
    // Global scroll effects (Header & Logo)
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        if (window.scrollY > window.innerHeight * 0.8) {
          document.body.classList.add('scrolled-past-hero');
        } else {
          document.body.classList.remove('scrolled-past-hero');
        }
      }
    });

    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const navOverlay = document.getElementById('navOverlay');
    const navOverlayBg = document.getElementById('navOverlayBg');
    let isMenuOpen = false;

    if (menuToggleBtn && navOverlay && typeof gsap !== 'undefined') {
      const mainEase = (() => {
        try {
          if (typeof CustomEase !== 'undefined') {
            gsap.registerPlugin(CustomEase);
            CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
            return "main";
          }
        } catch (e) { }
        return "power2.out";
      })();
      gsap.defaults({ ease: mainEase, duration: 0.7 });

      const menuPanel = navOverlay.querySelector('.nav-menu-panel');
      const overlayBg = navOverlay.querySelector('.nav-overlay-bg');
      const backdropLayers = Array.from(navOverlay.querySelectorAll('.nav-backdrop-layer'));
      const menuLinks = Array.from(navOverlay.querySelectorAll('.nav-menu-link'));
      const btnLabels = Array.from(menuToggleBtn.querySelectorAll('.menu-btn-label'));
      const btnIcon = menuToggleBtn.querySelector('.menu-btn-icon');

      function openMenu() {
        if (!menuPanel || !overlayBg) return;
        isMenuOpen = true;
        navOverlay.setAttribute('data-nav', 'open');
        document.body.style.overflow = 'hidden';
        gsap.killTweensOf(menuPanel);
        gsap.killTweensOf(overlayBg);
        if (backdropLayers.length) gsap.killTweensOf(backdropLayers);
        if (menuLinks.length) gsap.killTweensOf(menuLinks);
        gsap.set(overlayBg, { autoAlpha: 0 });
        gsap.set(menuPanel, { xPercent: 100, x: 0, visibility: 'visible' });
        if (backdropLayers.length) gsap.set(backdropLayers, { xPercent: 101 });
        if (menuLinks.length) gsap.set(menuLinks, { yPercent: 140, rotate: 10, opacity: 0 });
        const tl = gsap.timeline();
        tl.to(btnLabels, { yPercent: -100, stagger: 0.1, duration: 0.4 }, 0)
          .to(btnIcon, { rotate: 315, duration: 0.4 }, 0)
          .to(overlayBg, { autoAlpha: 1, duration: 0.4 }, 0)
          .to(menuPanel, { xPercent: 0, duration: 0.6, ease: mainEase }, 0);
        if (backdropLayers.length) {
          tl.to(backdropLayers, { xPercent: 0, stagger: 0.1, duration: 0.6, ease: mainEase }, 0.1);
        }
        if (menuLinks.length) {
          tl.to(menuLinks, { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }, 0.3);
        }
      }

      function closeMenu() {
        if (!menuPanel || !overlayBg) return;
        isMenuOpen = false;
        navOverlay.setAttribute('data-nav', 'closed');
        document.body.style.overflow = '';
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set([menuPanel, overlayBg, ...backdropLayers, ...menuLinks], { clearProps: 'all' });
          }
        });
        tl.to(overlayBg, { autoAlpha: 0, duration: 0.4 }, 0);
        if (backdropLayers.length) {
          tl.to(backdropLayers, { xPercent: 101, stagger: 0.05, duration: 0.4 }, 0);
        }
        tl.to(menuPanel, { xPercent: 100, duration: 0.5, ease: "power2.in" }, 0)
          .to(btnLabels, { yPercent: 0, duration: 0.4 }, 0)
          .to(btnIcon, { rotate: 0, duration: 0.4 }, 0);
      }

      menuToggleBtn.addEventListener('click', () => {
        if (isMenuOpen) closeMenu();
        else openMenu();
      });

      if (navOverlayBg) {
        navOverlayBg.addEventListener('click', closeMenu);
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) closeMenu();
      });

      // Shape hover effects
      const menuItems = Array.from(navOverlay.querySelectorAll('.nav-menu-item[data-shape]'));
      const shapesContainer = navOverlay.querySelector('.nav-ambient-shapes');

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute('data-shape');
        const shape = shapesContainer ? shapesContainer.querySelector(`.nav-bg-shape-${shapeIndex}`) : null;
        if (!shape) return;
        const shapeEls = Array.from(shape.querySelectorAll('.nav-shape-el'));
        if (!shapeEls.length) return;
        item.addEventListener('mouseenter', () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll('.nav-bg-shape').forEach(s => s.classList.remove('active'));
          }
          shape.classList.add('active');
          gsap.fromTo(shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10, transformOrigin: "50% 50%" },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)', overwrite: 'auto' }
          );
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(shapeEls, {
            scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in',
            onComplete: () => shape.classList.remove('active'),
            overwrite: 'auto'
          });
        });
      });

      menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          closeMenu();
          setTimeout(() => {
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.href = `../index.html${href}`;
            }
          }, 600);
        });
      });

      // Logo click behavior (navigate to homepage since we are in eventSection)
      const headerLogo = document.querySelector('.header-logo');
      if (headerLogo) {
        headerLogo.addEventListener('click', function(e) {
          e.preventDefault();
          if (isMenuOpen) {
            closeMenu();
          }
          setTimeout(() => {
            window.location.href = '../index.html';
          }, isMenuOpen ? 600 : 0);
        });
      }

      const logoHoverZone = document.querySelector('.logo-hover-zone');
      if (logoHoverZone && headerLogo) {
        logoHoverZone.addEventListener('click', function() {
          headerLogo.click();
        });
      }
    }
  }

  function initRevealAnimations() {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        } else {
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    const revealables = document.querySelectorAll('.reveal, .section, .resource-card, .event-card, .stat-card');
    revealables.forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
      observer.observe(el);
    });
  }

  async function init() {
    // Load all components
    await Promise.all(components.map(loadComponent));

    // Initialize Lucide icons for loaded components
    if (window.lucide) {
      window.lucide.createIcons();
    }

    initNavbar();
    initRevealAnimations();

    // ── 10. CHATBOT LOGIC ──
        function initChatbot() {
            const toggleBtn = document.getElementById('chatbot-toggle');
            const closeBtn = document.getElementById('chatbot-close');
            const chatWindow = document.getElementById('chatbot-window');
            const chatForm = document.getElementById('chatbot-form');
            const chatInput = document.getElementById('chatbot-input');
            const messagesContainer = document.getElementById('chatbot-messages');

            if (!toggleBtn || !chatWindow) return;

            toggleBtn.addEventListener('click', () => {
                chatWindow.classList.toggle('hidden');
                if (!chatWindow.classList.contains('hidden')) {
                    chatInput.focus();
                }
            });

            closeBtn.addEventListener('click', () => {
                chatWindow.classList.add('hidden');
            });

            function addMessage(text, isUser) {
                const msgDiv = document.createElement('div');
                msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
                
                let contentHTML;
                if (isUser) {
                    contentHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                } else {
                    if (typeof marked !== 'undefined') {
                        contentHTML = marked.parse(text);
                    } else {
                        contentHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    }
                }
                
                msgDiv.innerHTML = `<div class="message-content">${contentHTML}</div>`;
                messagesContainer.appendChild(msgDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            if (chatForm) {
                chatForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const message = chatInput.value.trim();
                    if (!message) return;

                    addMessage(message, true);
                    chatInput.value = '';
                    
                    // Show typing indicator
                    const typingId = 'typing-' + Date.now();
                    const typingDiv = document.createElement('div');
                    typingDiv.id = typingId;
                    typingDiv.className = 'message bot-message';
                    typingDiv.innerHTML = '<div class="message-content typing-indicator"><span>.</span><span>.</span><span>.</span></div>';
                    messagesContainer.appendChild(typingDiv);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;

                    try {
                        const response = await fetch('/api/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ message })
                        });
                        
                        const data = await response.json();
                        document.getElementById(typingId).remove();
                        
                        if (response.ok) {
                            addMessage(data.answer, false);
                        } else {
                            addMessage(data.error || "Sorry, something went wrong.", false);
                        }
                    } catch (err) {
                        const t = document.getElementById(typingId);
                        if(t) t.remove();
                        addMessage("Connection error. Please try again.", false);
                    }
                });
            }
        }
        initChatbot();

        // ── 11. ASSETS PRELOADING ──
        function preloadAssets() {
            const imagesToPreload = [];
            if (typeof memberGroups !== 'undefined') {
                Object.values(memberGroups).forEach(group => {
                    group.members.forEach(member => {
                        if (member.imageSrc) imagesToPreload.push(member.imageSrc);
                        if (member.thumbnailSrc) imagesToPreload.push(member.thumbnailSrc);
                    });
                });
            }
            document.querySelectorAll('img').forEach(img => { if (img.src) imagesToPreload.push(img.src); });
            const uniqueImages = [...new Set(imagesToPreload.filter(src => src && !src.startsWith('data:')))];
            uniqueImages.forEach(src => { const img = new Image(); img.src = src; });
            document.querySelectorAll('video').forEach(video => { video.preload = 'auto'; });
            console.log(`[Preload] ${uniqueImages.length} images preloaded.`);
        }
        setTimeout(preloadAssets, 1000);
    }

    init();
});

const EVENTS = [
  {
    id: 1,
    name: "CodeFest Round 1",
    date: "05 May 2023",
    cat: "Coding Competition",
    color: "#ff6b00",
    short: "Competitive problem solving at its finest.",
    img: "assets/codefest1/1.jpeg",
    desc: "CodeFest Round 01 was organized by CodeMate and concluded successfully. The event brought together students interested in coding and competitive problem-solving, creating an engaging platform for participants to test their logical thinking and programming skills.",
    speakersLabel: "Winners",
    speakers: [
      "Shashank Shekhar Kashyap — Winner",
      "Puduri Vinay Kumar — Runner-Up",
      "Suyash Raj — 2nd Runner-Up",
    ],
    tech: ["CodeChef"],
    stats: { Participants: 0, Teams: 0, Prizes: 3 },
    gallery: [
      "assets/codefest1/2.jpeg",
      "assets/codefest1/3.jpeg",
      "assets/codefest1/4.jpeg",
    ],
  },
  {
    id: 2,
    name: "CodeFest Round 02",
    date: "01 July 2023",
    cat: "Coding Competition",
    color: "#ff6b00",
    short: "Multi-institutional coding and typing battle.",
    img: "assets/codefest2/5.jpeg",
    desc: "CodeFest Round 02 was conducted successfully with participation from students across Shillong. The competition focused on coding and typing proficiency, attracting talented participants from multiple institutions and creating a highly competitive environment.",
    speakersLabel: "Winners",
    speakers: [
      "Sushil Chettri — Winner",
      "Gaurav Joshi — Runner-Up",
      "Kundan Kumar Jha — 2nd Runner-Up",
    ],
    tech: ["CodeChef"],
    stats: { Participants: 0, Teams: 0, Prizes: 3 },
    gallery: [
      "assets/codefest2/6.jpeg",
      "assets/codefest2/7.jpeg",
      "assets/codefest2/8.jpeg",
    ],
  },
  {
    id: 3,
    name: "Orientation Session 2023",
    date: "16 September 2023",
    cat: "Orientation",
    color: "#ff6b00",
    short: "Introduction to the CodeMate family.",
    img: "assets/orientation1/9.png",
    desc: "The CodeMate Orientation Session 2023 marked the beginning of an exciting journey as we warmly welcomed enthusiastic individuals into the CodeMate family. The session provided a platform for members to interact, bond, and exchange innovative ideas, with discussions revolving around the vision and aims of the community. An engaging activity brought everyone together, with the excitement and passion of new members reflecting the immense potential of the community for growth, collaboration, and learning.",
    speakersLabel: "Organised By",
    speakers: ["Team CodeMate"],
    tech: [],
    stats: { Participants: 0, Teams: 0, Prizes: 0 },
    gallery: [
      "assets/orientation1/10.png",
      "assets/codefest3/11.jpeg",
      "assets/codefest3/12.jpeg",
    ],
  },
  {
    id: 4,
    name: "Hostel Havoc 1.0",
    date: "24 May – 01 June 2025",
    cat: "Sports Event",
    color: "#ff6b00",
    short: "A Celebration of Competition, Camaraderie & CodeMate Spirit.",
    img: "assets/hostelhavoc/13.jpg",
    desc: 'CodeMate NEHU organized its first-ever inter-hostel sports event, "Hostel Havoc 1.0," at KV Ground, North-Eastern Hill University (NEHU), Shillong. The event brought together students from five hostels and beautifully blended sportsmanship, teamwork, leadership, and community spirit.',
    speakersLabel: "Event Lead & Winners",
    speakers: [
      "Dibakar Patar — Event Lead",
      "Hostel Kyllang — Winner",
      "Hostel Renggira — Runner-Up",
    ],
    tech: [],
    stats: { Hostels: 5, Prizes: 2, Participants: 0, Teams: 0 },
    gallery: [
      "assets/hostelhavoc/14.jpg",
      "assets/hostelhavoc/15.jpg",
      "assets/hostelhavoc/26.jpg",
    ],
  },
  {
    id: 5,
    name: "CodeFest 3.0",
    date: "10 November 2025",
    cat: "Coding & Typing Competition",
    color: "#ff6b00",
    short: "Where coding meets typing in a battle of speed and logic.",
    img: "assets/codefest3/17.jpeg",
    desc: "CodeFest 3.0 concluded successfully as a coding and typing competition filled with problem-solving, speed, and technical enthusiasm. The event combined competitive coding through CodeChef with typing battles hosted on ChaiType, creating an engaging and energetic experience. CodeMate also acknowledged the support of sponsors and mentors whose guidance contributed significantly to its success.",
    speakersLabel: "Winners",
    speakers: [
      "Saumyapriya Mandal — Winner",
      "Drona Bopche — Runner-Up",
      "Tanvir Mahtab — 2nd Runner-Up",
    ],
    tech: ["CodeChef", "ChaiType"],
    stats: { Participants: 0, Teams: 0, Prizes: 3 },
    gallery: [
      "assets/codefest3/18.jpeg",
      "assets/codefest3/19.jpeg",
      "assets/codefest3/20.jpeg",
    ],
  },
  {
    id: 6,
    name: "Resume Building Webinar",
    date: "12 April 2026",
    cat: "Place2Prep",
    color: "#ff6b00",
    short: "Resume insights from industry recruiters.",
    img: "assets/resume/21.jpg",
    desc: "The webinar provided participants with practical guidance on building professional resumes that stand out during recruitment processes. Students gained valuable insights into how recruiters evaluate resumes and learned common mistakes that can lead to rejection. Real-world placement experiences and industry expectations shared by the speaker made the session highly relevant and beneficial for aspiring job seekers.",
    speakersLabel: "Speaker",
    speakers: ["Gowtham Siddartha"],
    tech: [],
    stats: { Participants: 36, Teams: 0, Prizes: 0 },
    gallery: [
      "assets/resume/22.jpg",
      "assets/resume/23.jpg",
      "assets/resume/24.jpg",
    ],
  },
  {
    id: 7,
    name: "Interview Mastery: Beyond the Resume",
    date: "02 May 2026",
    cat: "Place2Prep",
    color: "#ff6b00",
    short: "Interview insights that go beyond your resume.",
    img: "assets/interview/25.jpg",
    desc: '"Interview Mastery: Beyond the Resume" was an interactive online session organized by CodeMate to guide students through the real-world interview process and career preparation strategies. The session focused on helping participants understand what recruiters truly look for beyond academic achievements and resumes.',
    speakersLabel: "Speaker",
    speakers: ["Abhishek Kumar Rai"],
    tech: [],
    stats: { Participants: 27, Teams: 0, Prizes: 0 },
    gallery: [
      "assets/interview/26.jpg",
      "assets/interview/27.jpg",
      "assets/interview/28.jpg",
    ],
  },
  {
    id: 8,
    name: "Beyond Engineering",
    date: "31st May, 2026",
    cat: "MBA and Management Pathways for Engineers",
    color: "#ff6b00",
    short:
      " The session aimed to provide participants with a clear roadmap for transitioning from an engineering background to management education, including MBA and related programs.",
    img: "assets/beyond/29.jpg",
    desc: '"Beyond Engineering" was an interactive online session organized by CodeMate for students interested in pursuing management studies after completing their BTech degree. The session aimed to provide participants with a clear roadmap for transitioning from an engineering background to management education, including MBA and related programs. The speaker shared valuable insights on preparation strategies, useful resources, interview techniques, and the mindset of interviewers during the selection process.',
    speakersLabel: "Speaker",
    speakers: ["Dr. Kuldeep Baishya"],
    tech: [],
    stats: { Participants: 13, Teams: 0, Prizes: 0 },
    gallery: [
      "assets/beyond/30.jpg",
      "assets/beyond/31.jpg",
      "assets/beyond/32.jpg",
    ],
  },
];

function drawGrid(
  id,
  stroke = "rgba(180,180,180,0.13)",
  w = 50,
  h = 50,
  hi = [],
) {
  const svg = document.getElementById(id);
  if (!svg) return;
  const W = window.innerWidth,
    H = svg.parentElement.offsetHeight || 800;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  let s = `<defs><pattern id="g_${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse">`;
  s += `<path d="M.5 ${h}V.5H${w}" fill="none" stroke="${stroke}" stroke-width="1"/></pattern></defs>`;
  s += `<rect width="100%" height="100%" fill="url(#g_${id})"/>`;
  hi.forEach(([x, y]) => {
    s += `<rect x="${x * w + 1}" y="${y * h + 1}" width="${w - 1}" height="${h - 1}" fill="${stroke}" stroke="none"/>`;
  });
  svg.innerHTML = s;
}
function initGrids() {
  drawGrid("hero-grid", "rgba(180,180,180,0.12)", 50, 50, [
    [2, 2],
    [5, 4],
    [8, 2],
    [3, 7],
    [11, 4],
    [14, 7],
  ]);
  drawGrid("detail-grid", "rgba(180,180,180,0.12)", 60, 60);
  drawGrid("footer-grid", "rgba(255,107,0,0.04)", 60, 60);
}
initGrids();
window.addEventListener("resize", initGrids);

const dotsWrap = document.getElementById("nav-dots");
EVENTS.forEach((ev) => {
  const btn = document.createElement("button");
  btn.className = "dot-btn";
  btn.dataset.id = ev.id;
  btn.title = ev.name;
  btn.onclick = () => openEvent(ev.id);
  dotsWrap.appendChild(btn);
});

window.addEventListener("scroll", () => {
  const sg = document.getElementById("hero-grid");
  if (sg) sg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
});

const grid = document.getElementById("events-grid");
EVENTS.forEach((ev, i) => {
  const card = document.createElement("div");
  card.className = "event-card";
  card.dataset.id = ev.id;
  card.innerHTML = `
    <div class="card-glow" style="background:radial-gradient(circle,${ev.color}30 0%,transparent 70%)"></div>
    <div class="card-img-wrap">
      <img src="${ev.img}" alt="${ev.name}" loading="lazy"/>
      <div class="card-overlay"></div>
      <span class="card-badge" style="color:${ev.color};border-color:${ev.color}40;background:${ev.color}18">${ev.cat}</span>
    </div>
    <div class="card-border-glow" style="border-color:${ev.color}"></div>
    <div class="card-body">
      <p class="card-date">${ev.date}</p>
      <h3 class="card-name">${ev.name}</h3>
      <p class="card-desc">${ev.short}</p>
      <div class="card-cta" style="color:${ev.color}">View Details <span>→</span></div>
    </div>`;

  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    const cx = r.width / 2,
      cy = r.height / 2;
    const rotY = ((x - cx) / cx) * 10,
      rotX = -((y - cy) / cy) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
    card.querySelector(".card-glow").style.transform =
      `translate(${x - 110}px,${y - 110}px)`;
    card.querySelector(".card-img-wrap img").style.transform =
      `scale(1.09) translate(${rotY * 0.5}px,${-rotX * 0.4}px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.querySelector(".card-img-wrap img").style.transform = "scale(1)";
  });
  card.addEventListener("click", () => openEvent(ev.id));
  grid.appendChild(card);
});

gsap.utils.toArray(".fade-up").forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
    },
  });
});

gsap.utils.toArray(".event-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 70, rotateX: 18, scale: 0.95, transformPerspective: 900 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.9,
      ease: "power4.out",
      delay: i * 0.08,
      transformPerspective: 900,
      scrollTrigger: {
        trigger: card,
        start: "top 92%",
        toggleActions: "play none none none",
      },
    },
  );
});

gsap.fromTo(
  "#hero .fade-up",
  { opacity: 0, y: 40 },
  {
    opacity: 1,
    y: 0,
    duration: 0.85,
    ease: "power3.out",
    stagger: 0.15,
    delay: 0.2,
  },
);

let currentId = null;
function openEvent(id) {
  const ev = EVENTS.find((e) => e.id === id);
  if (!ev) return;
  document.querySelectorAll(".dot-btn").forEach((b) => {
    const active = +b.dataset.id === id;
    b.classList.toggle("active", active);
    b.style.borderColor = active ? ev.color : "";
    b.style.background = active ? ev.color : "";
  });
  const statsHTML = Object.entries(ev.stats)
    .map(([k, v]) =>
      v > 0
        ? `<div class="stat-card"><div class="stat-num" style="color:${ev.color}">${v}</div><div class="stat-label">${k}</div></div>`
        : "",
    )
    .join("");
  const speakersHTML = ev.speakers
    .map(
      (s) =>
        `<div class="speaker-pill"><div class="speaker-av" style="background:${ev.color}20;color:${ev.color}">${s[0]}</div><span class="speaker-name">${s}</span></div>`,
    )
    .join("");
  const techHTML = ev.tech.length
    ? ev.tech
      .map(
        (t) =>
          `<span class="tech-tag" style="color:${ev.color};border-color:${ev.color}40;background:${ev.color}12">${t}</span>`,
      )
      .join("")
    : `<span style="color:#aaa;font-size:13px">—</span>`;
  const galleryHTML = ev.gallery
    .map(
      (g) =>
        `<div class="gallery-img"><img src="${g}" alt="" loading="lazy"/></div>`,
    )
    .join("");
  const idx = EVENTS.findIndex((e) => e.id === id);
  const html = `
    <div class="detail-banner">
      <img src="${ev.img}" alt="${ev.name}" id="detail-img"/>
      <div class="detail-banner-overlay"></div>
      <div class="detail-banner-text">
        <span class="d-badge" style="color:${ev.color};border-color:${ev.color}40;background:${ev.color}20">${ev.cat}</span>
        <h2>${ev.name}</h2><p>${ev.date}</p>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-col">
        <h3>About the Event</h3><p>${ev.desc}</p>
        <h3 class="mt24">Technologies</h3>
        <div class="tech-tags mt8">${techHTML}</div>
        <h3 class="mt24">${ev.speakersLabel}</h3>
        <div class="speakers-row mt8">${speakersHTML}</div>
      </div>
      <div class="detail-col">
        <h3>Event Stats</h3>
        <div class="stats-grid mt8">${statsHTML || '<p style="color:#aaa;font-size:13px">—</p>'}</div>
        <h3>Gallery</h3>
        <div class="gallery-strip mt8">${galleryHTML}</div>
        <button class="detail-cta-btn mt16" style="background:${ev.color};box-shadow:0 8px 28px ${ev.color}45"
          onmouseover="this.style.transform='scale(1.03)'"
          onmouseout="this.style.transform='scale(1)'"
          onclick="alert('Registered interest for ${ev.name}! 🎉')">Register Interest →</button>
      </div>
    </div>
    <div class="detail-nav-arrows">
      ${idx > 0 ? `<button class="arrow-btn" onclick="openEvent(${EVENTS[idx - 1].id})" title="${EVENTS[idx - 1].name}"><span class="arrow-icon">←</span><span class="arrow-label">Previous<br/><strong>${EVENTS[idx - 1].name}</strong></span></button>` : `<div></div>`}
      ${idx < EVENTS.length - 1 ? `<button class="arrow-btn arrow-btn-next" onclick="openEvent(${EVENTS[idx + 1].id})" title="${EVENTS[idx + 1].name}" style="border-color:${ev.color}40"><span class="arrow-label" style="text-align:right">Next<br/><strong>${EVENTS[idx + 1].name}</strong></span><span class="arrow-icon" style="color:${ev.color}">→</span></button>` : `<div></div>`}
    </div>`;
  const placeholder = document.getElementById("detail-placeholder");
  const content = document.getElementById("detail-content");
  placeholder.style.display = "none";
  content.style.display = "block";
  if (currentId !== null) {
    gsap.to(content, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        content.innerHTML = html;
        animateIn();
      },
    });
  } else {
    content.innerHTML = html;
    animateIn();
  }
  currentId = id;
  gsap.to(window, {
    scrollTo: { y: "#detail-section", offsetY: 0 },
    duration: 0.9,
    ease: "power3.inOut",
  });
}
function animateIn() {
  const content = document.getElementById("detail-content");
  gsap.fromTo(
    content,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
  );
  const img = document.getElementById("detail-img");
  if (img)
    gsap.fromTo(
      img,
      { scale: 1.1 },
      { scale: 1, duration: 0.9, ease: "power3.out" },
    );
}

function scrollToEvents() {
  gsap.to(window, {
    scrollTo: { y: "#events-section", offsetY: -20 },
    duration: 0.8,
    ease: "power3.inOut",
  });
}
function scrollToFooter() {
  gsap.to(window, {
    scrollTo: { y: "#footer-cta" },
    duration: 0.9,
    ease: "power3.inOut",
  });
}
