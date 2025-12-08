"use client";

import { characters } from "@/lib/quizData";
import { motion } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function CharacterGallery() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="py-20 px-4 w-full max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">QUALE STRANGER MARKETER SEI?</h2>
                <div className="h-1 w-24 bg-neon-blue mx-auto shadow-[0_0_10px_#00d4ff]" />
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-8 py-4 px-4 -mx-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {characters.map((char, index) => (
                    <motion.div
                        key={char.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="relative group select-none flex-none w-[280px] md:w-[320px] snap-center"
                    >
                        <div
                            className={clsx(
                                "h-full p-6 border border-white/10 rounded-lg bg-dark-secondary/50 backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col",
                                "group-hover:border-[color:var(--char-color)] group-hover:shadow-[0_0_20px_var(--char-color-glow)]"
                            )}
                            style={
                                {
                                    '--char-color': char.color,
                                    '--char-color-glow': `${char.color}80`
                                } as React.CSSProperties
                            }
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 flex flex-col h-full items-center text-center">
                                <div
                                    className="w-20 h-20 rounded-full mb-4 border-2 border-[color:var(--char-color)] overflow-hidden bg-black/50 relative"
                                    style={{ '--char-color': char.color } as React.CSSProperties}
                                >
                                    <Image src={char.image} fill alt={char.name} className="object-cover pointer-events-none" />
                                </div>

                                <h3 className="font-heading text-2xl text-white mb-1 group-hover:text-[color:var(--char-color)] transition-colors"
                                    style={{ '--char-color': char.color } as React.CSSProperties}
                                >
                                    {char.name}
                                </h3>
                                <p className="text-xs font-mono text-neon-blue mb-2 uppercase tracking-wider">{char.role}</p>
                                <p className="text-sm text-text-secondary mb-6 flex-grow">{char.description}</p>

                                <Link href="/quiz" className="w-full mt-auto" draggable={false}>
                                    <button
                                        className="w-full py-2 border border-white/20 text-white/60 text-xs font-bold uppercase tracking-widest rounded hover:bg-white/10 hover:text-white hover:border-white/40 transition-all group-hover:border-[color:var(--char-color)] group-hover:text-[color:var(--char-color)]"
                                        style={{ '--char-color': char.color } as React.CSSProperties}
                                    >
                                        FAI IL QUIZ
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
