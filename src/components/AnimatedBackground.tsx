import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    // Generate floating dots with varied colors
    const colors = ['coral', 'violet', 'cyan', 'emerald'];
    const dots = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        color: colors[Math.floor(Math.random() * colors.length)],
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated grid pattern - more visible in light mode */}
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.05]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" className="text-violet dark:text-white" />
                </svg>
            </div>

            {/* Floating dots - more vibrant in light mode */}
            {dots.map((dot) => (
                <motion.div
                    key={dot.id}
                    className={`absolute rounded-full ${dot.color === 'coral' ? 'bg-coral/40 dark:bg-coral/30' :
                            dot.color === 'violet' ? 'bg-violet/40 dark:bg-violet/30' :
                                dot.color === 'cyan' ? 'bg-cyan/40 dark:bg-cyan/30' :
                                    'bg-emerald/40 dark:bg-emerald/30'
                        }`}
                    style={{
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: dot.size,
                        height: dot.size,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 15, 0],
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: dot.duration,
                        delay: dot.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Vibrant gradient mesh - stronger in light mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-coral/[0.08] via-violet/[0.03] to-cyan/[0.08] dark:from-coral/[0.05] dark:via-transparent dark:to-violet/[0.05]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald/[0.03] to-transparent" />
        </div>
    );
};

export default AnimatedBackground;
