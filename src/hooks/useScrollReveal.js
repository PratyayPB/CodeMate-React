import { useEffect } from 'react';

const useScrollReveal = (deps = []) => {
    useEffect(() => {
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

        return () => {
            revealables.forEach(el => {
                observer.unobserve(el);
            });
        };
    }, deps);
};

export default useScrollReveal;
