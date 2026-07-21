<!DOCTYPE html>

<html class="scroll-smooth" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Resources | CodeMate - The Kinetic Architect</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&amp;family=Manrope:wght@200;300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary": "#5d5e5f",
                    "surface-container-lowest": "#ffffff",
                    "inverse-on-surface": "#f3f0ef",
                    "on-error": "#ffffff",
                    "primary-fixed": "#ffdbc8",
                    "on-tertiary-fixed": "#1a1c1c",
                    "on-secondary-fixed-variant": "#474746",
                    "on-primary": "#ffffff",
                    "on-surface": "#1c1b1b",
                    "secondary-fixed": "#e5e2e1",
                    "secondary": "#5f5e5e",
                    "surface-tint": "#984800",
                    "surface-container": "#f0eded",
                    "surface-bright": "#fcf9f8",
                    "secondary-fixed-dim": "#c8c6c5",
                    "outline-variant": "#dcc1b2",
                    "tertiary-fixed": "#e2e2e2",
                    "secondary-container": "#e2dfde",
                    "on-surface-variant": "#564337",
                    "on-secondary-fixed": "#1c1b1b",
                    "surface-dim": "#dcd9d9",
                    "primary": "#984800",
                    "on-primary-fixed-variant": "#743500",
                    "tertiary-container": "#a1a1a1",
                    "surface-variant": "#e5e2e1",
                    "outline": "#897265",
                    "error": "#ba1a1a",
                    "on-tertiary-fixed-variant": "#454747",
                    "surface": "#fcf9f8",
                    "inverse-surface": "#313030",
                    "inverse-primary": "#ffb689",
                    "primary-fixed-dim": "#ffb689",
                    "on-secondary": "#ffffff",
                    "on-primary-container": "#5d2900",
                    "surface-container-high": "#eae7e7",
                    "error-container": "#ffdad6",
                    "surface-container-low": "#f6f3f2",
                    "on-tertiary": "#ffffff",
                    "on-primary-fixed": "#311300",
                    "tertiary-fixed-dim": "#c6c6c6",
                    "on-tertiary-container": "#363838",
                    "surface-container-highest": "#e5e2e1",
                    "on-background": "#1c1b1b",
                    "on-error-container": "#93000a",
                    "on-secondary-container": "#636262",
                    "background": "#fcf9f8",
                    "primary-container": "#f28433"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "fontFamily": {
                    "headline": ["Space Grotesk", "sans-serif"],
                    "display": ["Space Grotesk", "sans-serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            vertical-align: middle;
        }
        
        .kinetic-grid {
            background-image: 
                linear-gradient(to right, rgba(152, 72, 0, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(152, 72, 0, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
        }

        .editorial-shadow {
            box-shadow: 0 20px 40px rgba(28, 27, 27, 0.06);
        }

        .hover-card-kinetic {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-card-kinetic:hover {
            transform: translateY(-8px) scale(1.01);
            box-shadow: 0 30px 60px rgba(242, 132, 51, 0.1);
        }

        .power-card-gradient {
            background: linear-gradient(135deg, #fcf9f8 0%, #f6f3f2 100%);
        }
    </style>

</head>
<body class="bg-surface text-on-surface font-body selection:bg-primary-container/30">
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(28,27,27,0.06)]">
<nav class="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
<div class="flex items-center gap-8">
<a class="text-2xl font-display font-black text-on-surface dark:text-inverse-on-surface tracking-tighter" href="#">CodeMate</a>
<div class="hidden md:flex gap-6">
<a class="text-on-surface-variant dark:text-surface-variant font-medium hover:text-primary-container transition-colors duration-300" href="#">Events</a>
<a class="text-primary-container font-bold border-b-2 border-primary-container pb-1" href="#">Resources</a>
<a class="text-on-surface-variant dark:text-surface-variant font-medium hover:text-primary-container transition-colors duration-300" href="#">Builders</a>
<a class="text-on-surface-variant dark:text-surface-variant font-medium hover:text-primary-container transition-colors duration-300" href="#">Forge</a>
</div>
</div>
<div class="flex items-center gap-6">
<div class="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15">
<span class="material-symbols-outlined text-on-surface-variant text-sm mr-2">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-48" placeholder="Search resources..." type="text"/>
</div>
<button class="bg-primary-container text-on-surface font-bold py-2 px-6 rounded-full active:scale-95 transition-transform">Join Forge</button>
<img class="w-10 h-10 rounded-full border-2 border-primary-container/20 object-cover" data-alt="A professional headshot of a software engineer with a neutral expression, wearing minimalist tech-wear. The lighting is soft and directional, creating a premium light-mode editorial portrait aesthetic. The background is a clean, warm off-white, matching the brand's sophisticated surface color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD98PBgN42SJqLfikytEQ2RhFdTnkleujysAZOeb0jHlxmgzjvR9ugV4Mx3wLkkiprbexpla1mYmpTnGfpQ7Dcvv_HNpyCKSzW-XhnMmCJqHT42heA2RFEfbtwpKnN8n9r4sVAQAh7Jaf6PO6o1pvQPM01Zyhg1uZEYU-XR0KkYwgyzfl43AMpLAvKp-JWyxqp0Z6UA2gHnpXOWJtMziLUO5ZMap0CAiS0o2AOsHPLSB1RXXtfTBNkwRM_0iG6I0-6VxMFqAB_zHak"/>
</div>
</nav>
</header>
<!-- Main Content -->
<main class="pt-24 min-h-screen kinetic-grid">
<!-- Hero Section -->
<section class="max-w-screen-2xl mx-auto px-8 pt-20 pb-16 relative overflow-hidden">
<div class="relative z-10 max-w-3xl">
<div class="inline-block py-1 px-3 mb-6 bg-primary-container/10 border border-primary-container/20 rounded-full">
<span class="text-xs font-bold tracking-widest text-primary uppercase">The Knowledge Base</span>
</div>
<h1 class="text-6xl md:text-8xl font-display font-black tracking-tighter leading-tight mb-8">
                    explore. <span class="text-primary-container">learn.</span> <br/>build.
                </h1>
<p class="text-xl md:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-2xl">
                    Curated resources for placements, higher studies, and career growth, handpicked for students. Editorial engineering for the modern developer.
                </p>
</div>
<!-- Decorative Accent -->
<div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">

</div>
</section>
<!-- Resources Grid -->
<section class="max-w-screen-2xl mx-auto px-8 pb-32">
<!-- Filter Bar (Auxiliary) -->
<div class="flex flex-wrap items-center gap-4 mb-12 border-b border-outline-variant/10 pb-8">
<button class="bg-on-surface text-surface px-6 py-2 rounded-full font-bold text-sm tracking-tight transition-all">All Resources</button>
<button class="bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full font-bold text-sm tracking-tight hover:bg-primary-container/10 transition-all">Placements</button>
<button class="bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full font-bold text-sm tracking-tight hover:bg-primary-container/10 transition-all">Higher Studies</button>
<button class="bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full font-bold text-sm tracking-tight hover:bg-primary-container/10 transition-all">R&amp;D</button>
<button class="bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full font-bold text-sm tracking-tight hover:bg-primary-container/10 transition-all">Open Source</button>
</div>
<!-- The Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
<!-- Resource Card 1 -->
<article class="hover-card-kinetic group relative bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/15 flex flex-col h-full editorial-shadow">
<div class="flex justify-between items-start mb-8">
<span class="text-[10px] font-black tracking-widest text-primary uppercase bg-primary-container/10 py-1 px-3 rounded">PLACEMENTS</span>
<span class="text-xs font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-sm">schedule</span> 15 min read
                        </span>
</div>
<div class="mb-10 aspect-[16/9] overflow-hidden rounded bg-surface-container-low">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A high-end, minimalist technical illustration of a modern resume with geometric abstract patterns. The style uses CodeMate Orange and Jet Black with thin architectural lines on a warm white background. The image feels like a cover for a premium design journal." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSroZ5mwJZVpBwn8L_WH1lF1F6DbBHA6L-gMq_GprAIjc1PaocJbhmmCe23hquP0MKeinMffx42qxfGGdNM1WpVWubJqmdlsaBYmqRkGpLwamClF4ke7vFukgKwGL-MO84vq6Tjd2vbWfWlc08wpYXVfO3GsUCUiymabz3aN3BH6eMQIF6ZO9Jv4AReRinlpBwgzJaBNJjl-wL7b-A6Z7UjEtLUF10lRSeRL70F2slc0nyeOx9ei_WbJpTBSwJiKT1Mv4NG_s07S8"/>
</div>
<h3 class="text-3xl font-display font-bold leading-tight mb-4 group-hover:text-primary transition-colors">Resume Building Handbook</h3>
<p class="text-on-surface-variant mb-auto text-lg leading-relaxed">
                        Master the art of storytelling through your technical experience. A comprehensive guide on structuring your CV for FAANG and high-growth startups.
                    </p>
<div class="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-xs">GS</div>
<span class="text-sm font-bold">Gowtham Siddhartha</span>
</div>
<a class="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:gap-4 transition-all group-hover:text-primary-container" href="#">
                            Read Now <span class="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</article>
<!-- Resource Card 2 -->
<article class="hover-card-kinetic group relative bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/15 flex flex-col h-full editorial-shadow">
<div class="flex justify-between items-start mb-8">
<span class="text-[10px] font-black tracking-widest text-primary uppercase bg-primary-container/10 py-1 px-3 rounded">CORE DEV</span>
<span class="text-xs font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-sm">schedule</span> 12 min read
                        </span>
</div>
<div class="mb-10 aspect-[16/9] overflow-hidden rounded bg-surface-container-low">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Abstract architectural diagram of software systems featuring interconnected spheres and conduits in a vibrant orange and deep grey palette. The aesthetic is clean, professional, and follows a strict geometric grid. Cinematic soft lighting emphasizes the depth of the 3D shapes." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1DxlbJfFeWrtWU71beui56yIhGOI2Ah2pPZIsVdG-1Ipx3jGfWlGnQNuPD_zyfb3Xg0txmPOZPWX1cLgq5CJdSkHTbwa0eM9wsQ5TWa1NDl6lC6jFsTPmXdBiIgzlcf21ypx3uKTO4mzsu9V-aMTkKmEU3dE6SBIxPZ__ZCmrZFTI1J9dMV9EII2IOofB3zJmCcUCjsWbfjd2AzmtKvQfXAXM2EuxFw7bAHbFtcqfg91iKEXwjyBpYyIq7zmTY3eUCnq03e6hmGk"/>
</div>
<h3 class="text-3xl font-display font-bold leading-tight mb-4 group-hover:text-primary transition-colors">System Design Fundamentals</h3>
<p class="text-on-surface-variant mb-auto text-lg leading-relaxed">
                        Breaking down load balancing, caching, and database sharding for junior engineers. The first step toward building scalable internet architectures.
                    </p>
<div class="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-xs">AM</div>
<span class="text-sm font-bold">Ananya Murthy</span>
</div>
<a class="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:gap-4 transition-all group-hover:text-primary-container" href="#">
                            Read Now <span class="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</article>
<!-- Resource Card 3 -->
<article class="hover-card-kinetic group relative bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/15 flex flex-col h-full editorial-shadow">
<div class="flex justify-between items-start mb-8">
<span class="text-[10px] font-black tracking-widest text-primary uppercase bg-primary-container/10 py-1 px-3 rounded">HIGHER STUDIES</span>
<span class="text-xs font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-sm">schedule</span> 20 min read
                        </span>
</div>
<div class="mb-10 aspect-[16/9] overflow-hidden rounded bg-surface-container-low">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A minimalist overhead shot of a clean workspace with a fountain pen, a sleek journal, and a laptop. The lighting is warm and academic. The color palette revolves around beige, grey, and deep orange accents, creating a high-end educational atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7rVwEdFeFC0t3zM3S3bC7cUfMZ5w5rAPV7PhYpwx5Tds_CnV7tz39yzzKh5VpLsUDcRa8UT0PKRnIKagCqQ6Z7XmE4cA3vSXNCb7YH222E-hhiAomJSS6zyr5PksauzGOESPdTxKYJhausbCNBMPlKDC406uI9BuofGhiB2SaYQr50n0p34xt7LNsAYXmhQr9bbSGZlgM-dzyHQNCD5LUE2eIj0Se0Tez_LgaFcTdeVaV5TRF-3q7Ykr73FCGxkPtODDv2SKHKHw"/>
</div>
<h3 class="text-3xl font-display font-bold leading-tight mb-4 group-hover:text-primary transition-colors">Masters in CS: US vs EU</h3>
<p class="text-on-surface-variant mb-auto text-lg leading-relaxed">
                        An objective analysis of global education hubs. We compare tuition, research opportunities, and post-study work visas for 2024 graduates.
                    </p>
<div class="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-xs">RK</div>
<span class="text-sm font-bold">Rahul Krishnan</span>
</div>
<a class="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:gap-4 transition-all group-hover:text-primary-container" href="#">
                            Read Now <span class="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</article>
<!-- Resource Card 4 -->
<article class="hover-card-kinetic group relative bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/15 flex flex-col h-full editorial-shadow">
<div class="flex justify-between items-start mb-8">
<span class="text-[10px] font-black tracking-widest text-primary uppercase bg-primary-container/10 py-1 px-3 rounded">PLACEMENTS</span>
<span class="text-xs font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-sm">schedule</span> 45 min read
                        </span>
</div>
<div class="mb-10 aspect-[16/9] overflow-hidden rounded bg-surface-container-low">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A dense, abstract visualization of data structures represented by glowing orange paths through a network of black monoliths. The style is hyper-modern and sleek, with a shallow depth of field and high-contrast editorial lighting. The visual represents complexity and mastery." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGetuRLLrajPexRq8hVz585HRygqJoNbGtMiKagpPyvIA0AgZXwAh6E4dU38BaBgEM9v-woNG_I2fF2dtnsMfBDPFljfSOE3-8_P_1O92jUelDkpLjW3nqrc2MPfsf-7j7wOJfLzpClvshFeC6nI4MupynJtJODW6-kJKX4LDkPQrUpcXxsuDMRirEaqNCTJKHn_lyoy1nUfJJd6VXUzi1diovivGfMAEIIP4ntKpgJ-tt5LfjVEmz6_naOhaFHNAFgDCvRMVhxdY"/>
</div>
<h3 class="text-3xl font-display font-bold leading-tight mb-4 group-hover:text-primary transition-colors">DSA Master Sheet</h3>
<p class="text-on-surface-variant mb-auto text-lg leading-relaxed">
                        The ultimate collection of 450+ problems categorized by pattern. Includes video explanations and space-time complexity analysis.
                    </p>
<div class="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-xs">SM</div>
<span class="text-sm font-bold">Siddharth Menon</span>
</div>
<a class="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:gap-4 transition-all group-hover:text-primary-container" href="#">
                            Read Now <span class="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</article>
<!-- Resource Card 5 -->
<article class="hover-card-kinetic group relative bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/15 flex flex-col h-full editorial-shadow">
<div class="flex justify-between items-start mb-8">
<span class="text-[10px] font-black tracking-widest text-primary uppercase bg-primary-container/10 py-1 px-3 rounded">R&amp;D</span>
<span class="text-xs font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-sm">schedule</span> 18 min read
                        </span>
</div>
<div class="mb-10 aspect-[16/9] overflow-hidden rounded bg-surface-container-low">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Futuristic digital art representing research and innovation. A laboratory of the future with holographic data displays and smooth metallic surfaces. The color palette is dominated by off-whites and deep greys with sharp orange laser-like highlights. High-fidelity rendering style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDojJJjhVEL7YFoKhGnRo56amhNGSXZPi_VlyybXASnXRkFtGgxjO5g7-xWA3APBEFv3TExuhw5GbTFmemAr1mGSp2p2whmDKIE7kPhye8Bf_1pUwgbpdrIj7EErNqZ88Z_4ZN2rjBh6QHlVA0_LAhrp9AIFXvnVMGsFyhUcnPpZvJy_tYiiIaDWCtUcE66r9xTkPut_knB_6qNwVwtYhRfDlptUXMdOK0nh-_P1brWt4SncdPwAEcXvOJpa2Sbsk2lDrAdLKn0RSE"/>
</div>
<h3 class="text-3xl font-display font-bold leading-tight mb-4 group-hover:text-primary transition-colors">Research Paper 101</h3>
<p class="text-on-surface-variant mb-auto text-lg leading-relaxed">
                        How to read and write your first IEEE paper. From selecting a problem statement to successfully navigating the peer-review process.
                    </p>
<div class="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-xs">PV</div>
<span class="text-sm font-bold">Priya Varma</span>
</div>
<a class="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:gap-4 transition-all group-hover:text-primary-container" href="#">
                            Read Now <span class="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</article>
<!-- Resource Card 6 -->
<article class="hover-card-kinetic group relative bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/15 flex flex-col h-full editorial-shadow">
<div class="flex justify-between items-start mb-8">
<span class="text-[10px] font-black tracking-widest text-primary uppercase bg-primary-container/10 py-1 px-3 rounded">CAREER GROWTH</span>
<span class="text-xs font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-sm">schedule</span> 8 min read
                        </span>
</div>
<div class="mb-10 aspect-[16/9] overflow-hidden rounded bg-surface-container-low">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A portrait of a group of diverse young professionals collaborating in a high-modern industrial office space. Large windows show a tech city skyline. The lighting is bright and optimistic, emphasizing a modern work culture. Colors are neutral with bold orange accents on technology pieces." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdhUjBhCqDYpziKyB1yBtsbiR7mFpfSKX1uqpGRD3SM-gX26fgP8e_Yu2FUMpn1ae9CDnWc9Saisau7Uf0r53dV1lNl7pARcADVWPbvcFRYslXE6yzimhRidK3XjfaYvys3m3_nezQJLyythKv0226bmavEAHWC65vPAph_CwCreldKUu59GxPQFU2gHQ4agjY1FXKNdPwo_N-Cp2xkC8O-7df-w70bdusOirwG_9yPnqFWcL7NOhn-Ud-rWJYUQesx_T9OhbgthE"/>
</div>
<h3 class="text-3xl font-display font-bold leading-tight mb-4 group-hover:text-primary transition-colors">Navigating Startup Culture</h3>
<p class="text-on-surface-variant mb-auto text-lg leading-relaxed">
                        Transitioning from an academic environment to a fast-paced product company. Learn the soft skills required to thrive in high-impact teams.
                    </p>
<div class="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-xs">KJ</div>
<span class="text-sm font-bold">Karthik J.</span>
</div>
<a class="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:gap-4 transition-all group-hover:text-primary-container" href="#">
                            Read Now <span class="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</article>
<!-- Resource Card 7 -->
<article class="hover-card-kinetic group relative bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/15 flex flex-col h-full editorial-shadow">
<div class="flex justify-between items-start mb-8">
<span class="text-[10px] font-black tracking-widest text-primary uppercase bg-primary-container/10 py-1 px-3 rounded">OPEN SOURCE</span>
<span class="text-xs font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-sm">schedule</span> 14 min read
                        </span>
</div>
<div class="mb-10 aspect-[16/9] overflow-hidden rounded bg-surface-container-low">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="An abstract visualization of a tree-like git history with various branches and merge points. The branches are made of glowing orange light against a deep charcoal background. The style is technical yet artistic, resembling a luxury tech brand's visual identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDItVoevbv_-k-p28Cuva1SWQAqeBLC1Lwd6CSpIKkfvCF5c3A-dNQcurKAkbqE9a8FyPv9Lsrh0fQYmdrqrDDZqjI6g5hyQ9snuIJXbvR9BOILpwmZm_AqLZI0oysmBiQ0vhCypnh8Ah7RGigynSR0ofOW_XlQpGvEif5dlEXXct9VhK3j0vL0srrBkLbHzrQ4GU6bF83SbA0HU45fFSQUg2wK1Fbe5RkxZoH-llRlJei34CXMQIFM5ggJWDF1Ys1ZYppwwQSrZA4"/>
</div>
<h3 class="text-3xl font-display font-bold leading-tight mb-4 group-hover:text-primary transition-colors">GSOC &amp; LFX Guide</h3>
<p class="text-on-surface-variant mb-auto text-lg leading-relaxed">
                        How to secure high-stipend open-source internships. Tips on picking projects, engaging with maintainers, and writing winning proposals.
                    </p>
<div class="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-xs">RT</div>
<span class="text-sm font-bold">Rohan Teja</span>
</div>
<a class="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:gap-4 transition-all group-hover:text-primary-container" href="#">
                            Read Now <span class="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</article>
<!-- Resource Card 8 -->
<article class="hover-card-kinetic group relative bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/15 flex flex-col h-full editorial-shadow">
<div class="flex justify-between items-start mb-8">
<span class="text-[10px] font-black tracking-widest text-primary uppercase bg-primary-container/10 py-1 px-3 rounded">HIGHER STUDIES</span>
<span class="text-xs font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-sm">schedule</span> 25 min read
                        </span>
</div>
<div class="mb-10 aspect-[16/9] overflow-hidden rounded bg-surface-container-low">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A stylized map of the world rendered in a high-contrast editorial style. Major tech hubs are highlighted with glowing orange markers. The aesthetic is clean, sophisticated, and professional, suggesting a global perspective and high-quality international study advice." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3N_Q4bauZbWsiGUQLhp-70uDUzxxDsGZuNkM92-lHsaPD5lP91i7aqb4P_6w1FuTKfIU8a_tfkpxQZzkdH3K1nUbR61YTGhSrhrV42-NXQouo5_ehaww6Rw1_1j4OU1-_0NmFgprPSgiz-fZPNjaC54mbzIUY8OLMrIhc2tluR3VspqSKAMJFDWD472Liy1lgdWdD3keZO0SmXuwLCaRlkZ3IPWDVo91d5eiMS-DsPqvMqWYf9hA8WVCbvIhUSJM8oCh45I94FO0"/>
</div>
<h3 class="text-3xl font-display font-bold leading-tight mb-4 group-hover:text-primary transition-colors">GRE/TOEFL Strategy</h3>
<p class="text-on-surface-variant mb-auto text-lg leading-relaxed">
                        A data-backed study plan for standardized testing. Learn how to achieve a 330+ score while balancing your final year college workload.
                    </p>
<div class="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-xs">DV</div>
<span class="text-sm font-bold">Deepika V.</span>
</div>
<a class="flex items-center gap-2 font-black text-primary uppercase text-xs tracking-widest hover:gap-4 transition-all group-hover:text-primary-container" href="#">
                            Read Now <span class="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</article>
</div>
<!-- Pagination/Load More -->
<div class="mt-20 flex justify-center">
<button class="group flex items-center gap-4 bg-on-surface text-surface py-4 px-10 rounded-full font-bold transition-all hover:pr-14">
                    Load More Resources
                    <span class="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_right_alt</span>
</button>
</div>
</section>
<!-- Newsletter CTA -->
<section class="max-w-screen-2xl mx-auto px-8 mb-24">
<div class="bg-primary-container p-12 md:p-20 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
<div class="relative z-10 max-w-xl">
<h2 class="text-4xl md:text-5xl font-display font-black text-on-surface tracking-tighter mb-6">Never miss a critical guide.</h2>
<p class="text-on-primary-container/80 text-lg font-medium leading-relaxed">
                        Get the latest resource picks, placement strategies, and architectural deep-dives delivered straight to your inbox. No fluff, just engineering.
                    </p>
</div>
<div class="relative z-10 w-full md:w-auto">
<form class="flex flex-col sm:flex-row gap-4">
<input class="bg-surface/20 border-none placeholder:text-on-primary-container/50 focus:ring-2 focus:ring-on-surface py-4 px-6 rounded-full text-on-surface font-bold min-w-[300px]" placeholder="Enter your email" type="email"/>
<button class="bg-on-surface text-surface py-4 px-8 rounded-full font-black uppercase text-xs tracking-widest">Subscribe</button>
</form>
</div>
<!-- Background visual noise -->
<div class="absolute inset-0 opacity-20 pointer-events-none">

</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface-container-highest dark:bg-surface-dim w-full py-12 px-8 mt-24">
<div class="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
<div class="flex flex-col gap-4">
<div class="font-display font-black text-primary text-2xl tracking-tighter">CodeMate</div>
<p class="font-label text-sm uppercase tracking-widest text-on-surface-variant">© 2024 CodeMate. Editorial Engineering for the Modern Developer.</p>
</div>
<div class="flex gap-8">
<a class="text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline font-label text-sm uppercase tracking-widest" href="#">Privacy Policy</a>
<a class="text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline font-label text-sm uppercase tracking-widest" href="#">Terms of Service</a>
<a class="text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline font-label text-sm uppercase tracking-widest" href="#">Contact Support</a>
<a class="text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline font-label text-sm uppercase tracking-widest" href="#">Brand Assets</a>
</div>
</div>
</footer>
<script>
        // Micro-interaction for resource cards
        document.querySelectorAll('article').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    </script>
</body></html>
