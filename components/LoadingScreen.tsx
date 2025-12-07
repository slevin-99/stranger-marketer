"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("INIZIALIZZAZIONE...");

    const texts = [
        "ANALISI DNA DIGITAL MARKETING...",
        "SCANSIONE STORICO CAMPAGNE...",
        "RILEVAMENTO SOFT SKILLS...",
        "CONNESSIONE AL SOTTOSOPRA...",
        "CALCOLO ROAS...",
        "FINALIZZAZIONE PROFILO..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + Math.random() * 5, 100));
        }, 100);

        const textInterval = setInterval(() => {
            setStatusText(texts[Math.floor(Math.random() * texts.length)]);
        }, 800);

        return () => {
            clearInterval(interval);
            clearInterval(textInterval);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-dark-bg z-50 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md">
                <div className="flex justify-between font-mono text-neon-green text-sm mb-2">
                    <span>ELABORAZIONE</span>
                    <span>{Math.floor(progress)}%</span>
                </div>

                {/* Retro Progress Bar */}
                <div className="h-4 border-2 border-neon-green p-0.5 rounded-sm relative overflow-hidden">
                    <motion.div
                        className="h-full bg-neon-green shadow-[0_0_10px_#39ff14]"
                        style={{ width: `${progress}%` }}
                    />
                    {/* Scanline pattern overlay on bar */}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:4px_100%] opacity-30" />
                </div>

                <motion.div
                    key={statusText}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 font-mono text-center text-neon-red animate-pulse"
                >
                    {statusText}
                </motion.div>
            </div>

            <div className="absolute bottom-10 font-mono text-xs text-text-secondary opacity-50">
                HAWKINS LAB v4.0.2 // NON SPEGNERE LA CONSOLE
            </div>
        </div>
    );
}
