import React, { useEffect, useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Hero = () => {
    useScrollReveal();
    const heroRef = useRef(null);
    const revealImgRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const scrollBoxRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        // Cursor reveal effect
        const heroSection = heroRef.current;
        const revealImg = revealImgRef.current;
        
        const handleMouseMove = (e) => {
            if (!heroSection || !revealImg) return;
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            revealImg.style.setProperty('--mx', `${x}px`);
            revealImg.style.setProperty('--my', `${y}px`);
        };

        const handleMouseLeave = () => {
            if (!revealImg) return;
            revealImg.style.setProperty('--mx', '-9999px');
            revealImg.style.setProperty('--my', '-9999px');
        };

        if (heroSection) {
            heroSection.addEventListener('mousemove', handleMouseMove);
            heroSection.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (heroSection) {
                heroSection.removeEventListener('mousemove', handleMouseMove);
                heroSection.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    useEffect(() => {
        // Morphing text effect
        const text1 = text1Ref.current;
        const text2 = text2Ref.current;
        
        if (!text1 || !text2) return;

        const texts = ["CONNECT.", "EVOLVE.", "INNOVATE."];
        const morphTime = 1;
        const cooldownTime = 3.0;
        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;
        
        text1.textContent = texts[textIndex % texts.length];
        text2.textContent = texts[(textIndex + 1) % texts.length];

        let animationFrameId;

        const setMorph = (fraction) => {
            text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            fraction = 1 - fraction;
            text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        };

        const doCooldown = () => {
            morph = 0;
            text2.style.filter = "";
            text2.style.opacity = "100%";
            text1.style.filter = "";
            text1.style.opacity = "0%";
        };

        const doMorph = () => {
            morph -= cooldown;
            cooldown = 0;
            let fraction = morph / morphTime;
            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }
            setMorph(fraction);
        };

        const animateMorph = () => {
            animationFrameId = requestAnimationFrame(animateMorph);
            const newTime = new Date();
            const shouldIncrementIndex = cooldown > 0;
            const dt = (newTime.getTime() - time.getTime()) / 1000;
            time = newTime;
            cooldown -= dt;
            
            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex = (textIndex + 1) % texts.length;
                    text1.textContent = texts[textIndex % texts.length];
                    text2.textContent = texts[(textIndex + 1) % texts.length];
                }
                doMorph();
            } else {
                doCooldown();
            }
        };

        animateMorph();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    useEffect(() => {
        // 3D Scroll Box
        const scrollBox = scrollBoxRef.current;
        const scrollContainer = scrollContainerRef.current;
        
        if (!scrollBox || !scrollContainer) return;

        const updateScrollAnimation = () => {
            if (window.innerWidth <= 768) {
                scrollBox.style.transform = 'none';
                scrollBox.classList.add('animate-in');
                return;
            }
            const rect = scrollContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = windowHeight;
            const end = windowHeight * 0.25;
            let progress = (start - rect.top) / (start - end);
            progress = Math.max(0, Math.min(1, progress));
            const rotateX = 20 * (1 - progress);
            const scale = 1.05 - (0.05 * progress);
            const translateY = -100 * progress;
            scrollBox.style.transform = `rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`;
            if (progress > 0.01) scrollBox.classList.add('animate-in');
            else scrollBox.classList.remove('animate-in');
        };

        window.addEventListener('scroll', updateScrollAnimation, { passive: true });
        updateScrollAnimation();

        return () => window.removeEventListener('scroll', updateScrollAnimation);
    }, []);

    return (
        <section id="home" className="hero twogood-v2" ref={heroRef}>
            <img
                ref={revealImgRef}
                className="hero-reveal-img"
                src="/images/sot4.png"
                alt="NEHU School of Technology"
            />

            <div className="hero-text-container">
                <h1 className="massive-title reveal">
                    <span className="word-small">BUILD.</span>
                    <div className="gooey-text-container">
                        <span ref={text1Ref} id="text1" className="word-large accent gooey-span"></span>
                        <span ref={text2Ref} id="text2" className="word-large accent gooey-span"></span>
                    </div>
                    <span className="word-small">GROW.</span>
                </h1>
            </div>

            <svg id="filters" style={{ display: 'none' }}>
                <defs>
                    <filter id="threshold">
                        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140" />
                    </filter>
                </defs>
            </svg>

            <div className="scroll-box-container" ref={scrollContainerRef}>
                <div className="mission-scroll-box" ref={scrollBoxRef}>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="mission-video-bg"
                        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
                    ></video>

                    <div className="mission-gradient-top"></div>
                    <div className="mission-gradient-bottom"></div>

                    <div className="mission-prisma-content">
                        <span className="mission-label">CodeMate</span>

                        <div className="mission-bottom-row">
                            <div className="mission-bottom-left">
                                <h2 className="mission-hero-title">where students become ready for what comes next</h2>
                            </div>
                            <div className="mission-bottom-right">
                                <p className="mission-hero-desc">
                                    CodeMate exists because the gap between classroom and career was too wide. We built a place where students find resources, mentors, and peers who understand the journey ahead.
                                </p>
                                <ul className="mission-hero-list">
                                    <li>Placement preparation that actually works</li>
                                    <li>Guidance for higher studies anywhere in the world</li>
                                    <li>A community that grows together and lifts each other up</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
