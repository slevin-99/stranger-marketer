"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { characters } from "@/lib/quizData";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StatsBoard() {
    const [stats, setStats] = useState<{ id: string, percentage: number }[]>([]);
    const [totalSubjects, setTotalSubjects] = useState(0);

    useEffect(() => {
        async function fetchStats() {
            if (!supabase) return;

            // Fetch all headers (efficient count) to calculate totals
            // Note: For large scale, you should use an RPC function: select character_id, count(*) from quiz_results group by character_id
            // For this MVP, we fetch 'character_id' only.
            const { data, error } = await supabase
                .from('quiz_results')
                .select('character_id');

            if (error || !data) {
                console.error("Error fetching stats:", error);
                return;
            }

            const total = data.length;
            setTotalSubjects(total);

            if (total === 0) {
                setStats([]);
                return;
            }

            // Calculate distribution
            const counts: Record<string, number> = {};
            data.forEach((row: any) => {
                counts[row.character_id] = (counts[row.character_id] || 0) + 1;
            });

            const newStats = Object.keys(counts).map(id => ({
                id,
                percentage: Math.round((counts[id] / total) * 100)
            })).sort((a, b) => b.percentage - a.percentage);

            setStats(newStats);
        }

        fetchStats();
    }, []);

    return (
        <section className="w-full py-20 bg-black/80 relative overflow-hidden border-t border-b border-white/10">
            {/* Decor */}
            <div className="absolute top-0 right-0 p-4 font-mono text-xs text-white/20">
                CONNESSIONE SICURA STABILITA
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Header / Context */}
                    <div className="w-full md:w-1/3 text-center md:text-left">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="font-heading text-4xl md:text-5xl text-white mb-6 uppercase"
                        >
                            Dati dal laboratorio di <span className="text-neon-red">Hawkins</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.8 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-text-secondary font-light text-lg mb-8"
                        >
                            Accesso al database... autorizzato. Ecco la distribuzione dei soggetti testati finora. I nostri scienziati stanno ancora analizzando i campioni.
                        </motion.p>

                        <div className="p-6 border border-neon-blue/30 bg-neon-blue/5 rounded backdrop-blur-sm mb-8">
                            <div className="font-mono text-neon-blue text-sm mb-2 uppercase tracking-widest">Soggetti Totali Testati</div>
                            <div className="font-heading text-5xl text-white">{totalSubjects.toLocaleString('it-IT')}</div>
                        </div>

                        <Link href="/quiz">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-neon-red/20 border border-neon-red text-neon-red font-bold rounded uppercase tracking-wider hover:bg-neon-red hover:text-white transition-colors"
                            >
                                FAI IL QUIZ
                            </motion.button>
                        </Link>
                    </div>

                    {/* The Grid / Charts */}
                    <div className="w-full md:w-2/3 bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm relative">
                        {/* Grid Lines Overlay */}
                        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none rounded-xl" />

                        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {stats.map((stat, index) => {
                                const character = characters.find(c => c.id === stat.id);
                                if (!character) return null;

                                return (
                                    <motion.div
                                        key={stat.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative"
                                    >
                                        <div className="flex justify-between items-end mb-1 text-sm font-mono uppercase tracking-wider">
                                            <span className="text-white flex items-center gap-2">
                                                <span className="text-white/30">#{index + 1}</span>
                                                {character.name}
                                                <span className="hidden sm:inline text-xs text-white/40 normal-case ml-2">- {character.role}</span>
                                            </span>
                                            <span style={{ color: character.color }}>{stat.percentage}%</span>
                                        </div>

                                        {/* Progress Bar Container */}
                                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${stat.percentage}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full relative"
                                                style={{ backgroundColor: character.color }}
                                            >
                                                {/* Glow effect on bar */}
                                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
