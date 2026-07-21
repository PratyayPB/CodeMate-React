import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main className="relative min-h-[80vh] w-full flex flex-col items-center justify-center bg-brand-dark px-4 font-sans text-center">
            {/* Background elements to match the site */}
            <div className="orange-glow-top" aria-hidden="true" />
            
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <h1 className="text-[120px] md:text-[180px] font-heading font-extrabold tracking-tighter text-brand-primary leading-none mb-4 drop-shadow-sm">
                    404
                </h1>
                
                <div className="space-y-4 mb-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 uppercase tracking-wide">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-zinc-600 max-w-md mx-auto">
                        Oops! The page you're looking for seems to have wandered off or doesn't exist.
                    </p>
                </div>
                
                <Link 
                    to="/" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-300 gap-2 uppercase tracking-widest text-sm"
                >
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Return to Homepage
                </Link>
            </div>
            
            {/* Background grid */}
            <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-40">
                <svg aria-hidden="true" className="w-full h-full">
                    <defs>
                        <pattern id="grid-pattern-404" width="40" height="40" patternUnits="userSpaceOnUse" x="-1" y="-1">
                            <path d="M.5 40V.5H40" fill="none" stroke="rgba(0,0,0,0.06)" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern-404)" />
                </svg>
            </div>
        </main>
    );
};

export default NotFound;
