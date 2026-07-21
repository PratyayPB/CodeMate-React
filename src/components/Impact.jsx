import React from 'react';
import { Users, Calendar, Globe, Award } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const Impact = () => {
    useScrollReveal();

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.setProperty('--mouse-x', '-999px');
        e.currentTarget.style.setProperty('--mouse-y', '-999px');
    };

    return (
        <section id="impact" className="impact section">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-tagline">we don't just promise</span>
                    <h2 className="section-title">let our <span className="accent">impact</span> speak for us</h2>
                    <p className="section-subtitle-impact">with 250+ members and steady growth, we're constantly pushing ourselves to become a stronger, better community.</p>
                </div>
                
                <div className="impact-grid">
                    <div className="impact-gallery impact-marquee-wrapper">
                        {/* Top Marquee (Reverse) */}
                        <div className="marquee-container" style={{ '--duration': '30s' }}>
                            <div className="marquee-content reverse">
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop" alt="Placeholder 1" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop" alt="Placeholder 2" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=400&fit=crop" alt="Placeholder 3" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop" alt="Placeholder 4" /></div>
                            </div>
                            <div className="marquee-content reverse" aria-hidden="true">
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop" alt="Placeholder 1" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop" alt="Placeholder 2" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=400&fit=crop" alt="Placeholder 3" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop" alt="Placeholder 4" /></div>
                            </div>
                        </div>

                        {/* Bottom Marquee (Normal) */}
                        <div className="marquee-container" style={{ '--duration': '30s' }}>
                            <div className="marquee-content">
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop" alt="Placeholder 5" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop" alt="Placeholder 6" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop" alt="Placeholder 7" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=400&h=400&fit=crop" alt="Placeholder 8" /></div>
                            </div>
                            <div className="marquee-content" aria-hidden="true">
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop" alt="Placeholder 5" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop" alt="Placeholder 6" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop" alt="Placeholder 7" /></div>
                                <div className="marquee-img-wrap"><img src="https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=400&h=400&fit=crop" alt="Placeholder 8" /></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="impact-stats">
                        {/* impact- abstract card layout */}
                        <div className="bento-grid">
                            {/* Item 1: Community (Large) */}
                            <div className="bento-item col-span-2 row-span-2" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                <div className="bento-icon"><Users size={24}/></div>
                                <div className="bento-content">
                                    <span className="bento-number">250+</span>
                                    <h3 className="bento-title">Members Community</h3>
                                    <p className="bento-desc">A vibrant ecosystem of developers, designers, and tech enthusiasts building the future together.</p>
                                </div>
                            </div>

                            {/* Item 2: Events (Small) */}
                            <div className="bento-item" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                <div className="bento-icon"><Calendar size={24}/></div>
                                <div className="bento-content">
                                    <span className="bento-number">30+</span>
                                    <h3 className="bento-title">Events</h3>
                                    <p className="bento-desc">Workshops, hackathons, and webinars.</p>
                                </div>
                            </div>

                            {/* Item 3: Reach (Small) */}
                            <div className="bento-item" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                <div className="bento-icon"><Globe size={24}/></div>
                                <div className="bento-content">
                                    <span className="bento-number">5+</span>
                                    <h3 className="bento-title">Institutions</h3>
                                    <p className="bento-desc">Connecting students across campuses.</p>
                                </div>
                            </div>

                            {/* Item 4: Mentors (Full Width Bottom) */}
                            <div className="bento-item col-span-3" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                <div className="bento-icon"><Award size={24}/></div>
                                <div className="bento-content">
                                    <span className="bento-number">10+</span>
                                    <h3 className="bento-title">Expert Mentors & Coordinators</h3>
                                    <p className="bento-desc">Industry professionals guiding the next generation of tech talent through hands-on coordination and mentorship.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Impact;
