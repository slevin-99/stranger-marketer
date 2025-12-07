"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { supabase } from "@/lib/supabase";

export default function LandingHero() {
    const [participantCount, setParticipantCount] = useState(0);

    useEffect(() => {
        async function fetchCount() {
            if (!supabase) return;

            const { count, error } = await supabase
                .from('quiz_results')
                .select('*', { count: 'exact', head: true });

            if (!error && count !== null) {
                setParticipantCount(count);
            }
        }

        fetchCount();

        // Optional: Subscribe to changes for real-time updates? 
        // For now, let's just fetch once on mount.
    }, []);

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-center p-4">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-radial from-red-900/10 to-transparent opacity-50 z-0" />

            {/* Main Content */}
            <div className="z-10 relative flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 font-mono text-neon-green tracking-widest text-sm md:text-base border border-neon-green/30 px-4 py-1 rounded bg-black/50 backdrop-blur-sm"
                >
                    HAWKINS MARKETING LAB — CLASSIFICATO
                </motion.div>

                <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl mb-4 text-transparent bg-clip-text bg-gradient-to-br from-neon-red via-red-500 to-purple-600 drop-shadow-[0_0_15px_rgba(255,0,64,0.5)] glitch-anim">
                    SCOPRI CHE <br /> STRANGER MARKETER <br /> SEI
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-text-secondary text-lg md:text-xl max-w-2xl mb-12 font-light"
                >
                    Quale ruolo avresti nella squadra di Hawkins? <br /> Il mercato è oscuro e pieno di mostri, ma ogni team ha bisogno dei suoi eroi. Scopri se sei il mago dei dati, il ranger delle campagne o la spia delle keyword.
                </motion.p>

                <Link href="/quiz">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 64, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="retro-button px-12 py-4 text-2xl font-bold text-neon-red border-neon-red rounded-sm bg-black/40 backdrop-blur-md relative overflow-hidden group"
                    >
                        <span className="relative z-10 group-hover:neon-glow">FAI IL QUIZ</span>
                        <div className="absolute inset-0 bg-neon-red/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </motion.button>
                </Link>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 1.5 }}
                    className="mt-24 font-mono text-xs text-text-secondary"
                >
                    SOGGETTI TESTATI: <span className="text-neon-blue">{participantCount.toLocaleString('it-IT')}</span>
                </motion.div>
            </div>

            <div className="absolute bottom-4 animate-bounce text-text-secondary opacity-50">
                ↓ SCORRI PER ESPLORARE I PROFILI ↓
            </div>
        </div>
    );
}
