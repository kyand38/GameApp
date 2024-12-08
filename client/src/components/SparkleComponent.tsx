import { useState, useEffect } from 'react';

const SparkleEffect = () => {
    const [sparkles, setSparkles] = useState<any[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newSparkle = {
                id: Math.random(),
                x: e.clientX,
                y: e.clientY,
            };
            setSparkles((prevSparkles) => [...prevSparkles, newSparkle]);

            if (sparkles.length > 50) {
                setSparkles((prevSparkles) => prevSparkles.slice(1));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [sparkles]);

    return (
        <>
            {sparkles.map((sparkle) => (
                <div
                    key={sparkle.id}
                    className="sparkle"
                    style={{
                        left: `${sparkle.x}px`,
                        top: `${sparkle.y}px`,
                    }}
                />
            ))}
        </>
    );
};

export default SparkleEffect;
