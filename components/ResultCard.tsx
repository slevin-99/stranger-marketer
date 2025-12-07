"use client";

import { Character } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import ShareButtons from "./ShareButtons";

interface ResultCardProps {
    primary: Character;
    secondary?: Character;
}

export default function ResultCard({ primary, secondary }: ResultCardProps) {
    return (
        <div className="w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full bg-dark-secondary/80 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
                style={{ borderColor: primary.color }}
            >
                {/* Glow effect specific to character */}
                <div
                    className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: primary.color }}
                />

                <div className="flex flex-col lg:flex-row">
                    {/* Left Column: Identity */}
                    <div className="w-full lg:w-1/3 p-8 lg:p-12 flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r border-white/10 relative">
                        <div
                            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-8 relative overflow-hidden bg-black"
                            style={{ borderColor: primary.color }}
                        >
                            <Image src={primary.image} fill alt={primary.name} className="object-cover" />
                        </div>

                        <motion.h1
                            className="font-heading text-5xl md:text-6xl text-white mb-2 uppercase"
                            style={{ textShadow: `0 0 10px ${primary.color}` }}
                        >
                            {primary.name}
                        </motion.h1>
                        <div className="font-mono text-neon-blue text-sm mb-6 tracking-[0.2em] uppercase">
                            {primary.nickname}
                        </div>

                        <div className="inline-block px-4 py-2 border border-white/20 rounded bg-white/5 font-mono text-xs uppercase tracking-widest mb-8">
                            ROLE: <span style={{ color: primary.color }}>{primary.role}</span>
                        </div>

                        <div className="mt-auto w-full">
                            <ShareButtons character={primary} />
                        </div>
                    </div>

                    {/* Right Column: Dossier */}
                    <div className="w-full lg:w-2/3 p-8 lg:p-12 relative">
                        <div className="mb-10">
                            <h3 className="text-xs font-mono text-white/40 mb-2 uppercase tracking-widest border-b border-white/10 pb-2">Analisi</h3>
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                                {primary.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h3 className="text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">Superpotere</h3>
                                <p className="text-neon-green">{primary.superpower}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">Punto Debole</h3>
                                <p className="text-neon-red">{primary.weakness}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h3 className="text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">Strumenti</h3>
                                <div className="flex flex-wrap gap-2">
                                    {primary.tools.map((tool, i) => (
                                        <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-text-secondary border border-white/10">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded border-l-4 border-white/20 italic text-text-secondary">
                                "{primary.mantra}"
                            </div>
                        </div>

                        {/* Team Compatibility */}
                        <div>
                            <h3 className="text-xs font-mono text-white/40 mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Compatibilità Team</h3>
                            <div className="flex flex-col gap-2 text-sm text-text-secondary">
                                <p><span className="text-white">Compatibile con:</span> {primary.compatible.join(", ")}</p>
                                <p><span className="text-white">Necessita:</span> {primary.teamNeed}</p>
                            </div>
                        </div>

                        {secondary && (
                            <div className="mt-12 pt-8 border-t border-white/10 opacity-60 hover:opacity-100 transition-opacity">
                                <p className="text-xs font-mono text-white/40 mb-2 uppercase">Match Secondario (L'alternativa Sottosopra)</p>
                                <p className="text-sm">
                                    Mostra anche tratti di <strong style={{ color: secondary.color }}>{secondary.name}</strong> ({secondary.role})
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
