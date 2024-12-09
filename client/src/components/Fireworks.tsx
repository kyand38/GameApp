import { useEffect } from 'react';
import { gsap } from 'gsap';

const Fireworks = () => {
    const createFirework = () => {
        for (let i = 0; i < 20; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            document.body.appendChild(firework);

            firework.style.position = 'absolute';
            firework.style.top = `${Math.random() * window.innerHeight}px`;
            firework.style.left = `${Math.random() * window.innerWidth}px`;
            firework.style.width = '10px';
            firework.style.height = '10px';
            firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
            firework.style.borderRadius = '50%';
            firework.style.opacity = '1';

            gsap.to(firework, {
                x: Math.random() * 800 - 400,
                y: Math.random() * 800 - 400,
                scale: Math.random() * 2 + 1,
                opacity: 0,
                duration: 2 + Math.random() * 2,
                ease: 'power4.out',
                onComplete: () => firework.remove(),
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(createFirework, 500);
        return () => clearInterval(interval);
    }, []);

    return null;
};

export default Fireworks;
