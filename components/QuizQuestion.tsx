"use client";

import { Question, Option } from "@/lib/types";
import { motion } from "framer-motion";
import clsx from "clsx";

interface QuizQuestionProps {
    question: Question;
    onAnswer: (index: number) => void;
    currentIndex: number;
    totalQuestions: number;
}

export default function QuizQuestion({
    question,
    onAnswer,
    currentIndex,
    totalQuestions
}: QuizQuestionProps) {

    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            {/* Header Info */}
            <div className="mb-12">
                <div className="flex justify-between items-end mb-2 border-b border-white/20 pb-2">
                    <span className="font-mono text-neon-blue text-sm tracking-wider">FREQUENZA {currentIndex + 1}/{totalQuestions}</span>
                    <span className="font-mono text-neon-red text-xs animate-pulse">REGISTRAZIONE...</span>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-neon-blue shadow-[0_0_10px_#00d4ff]"
                        initial={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="font-heading text-3xl md:text-5xl text-white mb-12 min-h-[120px] flex items-center shadow-black drop-shadow-lg">
                    {question.question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {question.options.map((option: Option, idx: number) => (
                        <motion.button
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{
                                scale: 1.02,
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                borderColor: idx % 2 === 0 ? "var(--neon-blue)" : "var(--neon-red)",
                                boxShadow: idx % 2 === 0 ? "0 0 15px var(--glow-blue)" : "0 0 15px var(--glow-red)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onAnswer(idx)}
                            className="relative p-6 md:p-8 text-left border border-white/20 rounded-lg bg-black/40 backdrop-blur-sm group transition-colors duration-300"
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-50 font-mono text-xs text-text-secondary group-hover:text-white">
                                0{idx + 1}
                            </div>

                            <span className="text-lg md:text-xl text-text-primary group-hover:text-white font-medium">
                                {option.text}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
