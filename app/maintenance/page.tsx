'use client';

import { motion } from 'framer-motion';

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg relative overflow-hidden">
            {/* Background glow */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #ff0040 0%, transparent 50%)'
                }}
            />

            {/* Scanlines effect */}
            <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-6"
            >
                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl font-display font-bold text-neon-red mb-6 
                    drop-shadow-[0_0_30px_rgba(255,0,64,0.8)] tracking-wider">
                    THE UPSIDE DOWN
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/80 font-mono mb-8">
                    Il portale è momentaneamente chiuso.
                </p>

                {/* Description */}
                <p className="text-white/60 max-w-md mx-auto mb-12">
                    Stiamo calibrando i sensori del Sottosopra. <br />
                    Torneremo presto con nuove avventure marketing.
                </p>

                {/* Animated dots */}
                <div className="flex justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-neon-red rounded-full"
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.3
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Footer */}
            <div className="absolute bottom-8 text-white/30 text-sm font-mono">
                stranger-marketers.com
            </div>
        </div>
    );
}
