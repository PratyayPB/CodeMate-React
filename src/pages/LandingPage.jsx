import React from 'react';
import Hero from '../components/Hero';
import Members from '../components/Members';
import Events from '../components/Events';
import Impact from '../components/Impact';
import Chatbot from '../components/Chatbot';
import ResourcesPreview from '../components/ResourcesPreview';

const LandingPage = () => {
    return (
        <main id="main-content" className="legacy-wrapper">
            <Hero />
            <div className="page-grid-bg relative z-0">
                <svg aria-hidden="true" className="grid-pattern-svg absolute inset-0 w-full h-full pointer-events-none -z-10">
                    <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse" x="-1" y="-1">
                            <path d="M.5 40V.5H40" fill="none" stroke="rgba(0,0,0,0.05)" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
                    <svg x="-1" y="-1" className="overflow-visible" fill="rgba(0,0,0,0.02)">
                        <rect strokeWidth="0" width="39" height="39" x="161" y="161" />
                        <rect strokeWidth="0" width="39" height="39" x="201" y="41" />
                        <rect strokeWidth="0" width="39" height="39" x="321" y="81" />
                        <rect strokeWidth="0" width="39" height="39" x="201" y="121" />
                        <rect strokeWidth="0" width="39" height="39" x="201" y="201" />
                        <rect strokeWidth="0" width="39" height="39" x="401" y="401" />
                        <rect strokeWidth="0" width="39" height="39" x="481" y="601" />
                        <rect strokeWidth="0" width="39" height="39" x="601" y="401" />
                        <rect strokeWidth="0" width="39" height="39" x="401" y="601" />
                    </svg>
                </svg>
                <ResourcesPreview />
                <Members />
                <Events />
                <Impact />
            </div>
            <Chatbot />
        </main>
    );
};

export default LandingPage;
