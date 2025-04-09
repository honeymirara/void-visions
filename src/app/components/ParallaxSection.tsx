'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const offsetX = (clientX - innerWidth / 2) / 50;
            const offsetY = (clientY - innerHeight / 2) / 50;

            const container = containerRef.current;
            if (!container) return;

            container.querySelectorAll('[data-parallax]').forEach((el) => {
                const speed = parseFloat(el.getAttribute('data-parallax') || '1');
                (el as HTMLElement).style.transform = `translate3d(${offsetX * speed}px, ${offsetY * speed}px, 0)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
                data-parallax="2"
            >
                🌀 Parallax!
            </div>
        </div>
    );
}
