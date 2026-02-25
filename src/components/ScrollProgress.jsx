import { useState, useEffect } from 'react';

export default function ScrollProgress() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement,
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
            const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            setWidth(percent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="scroll-progress">
            <div className="scroll-progress__bar" style={{ width: `${width}%` }} />
        </div>
    );
}
