import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('revealed');
                    observer.unobserve(el);
                }
            },
            { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

export function RevealOnScroll({ children, className = '', stagger = false }) {
    const ref = useScrollReveal();

    return (
        <div ref={ref} className={`reveal ${stagger ? 'stagger' : ''} ${className}`}>
            {children}
        </div>
    );
}
