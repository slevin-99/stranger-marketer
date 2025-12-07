"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/lib/quizData";
import { calculateResult } from "@/lib/quizLogic";
import QuizQuestion from "@/components/QuizQuestion";
import LoadingScreen from "@/components/LoadingScreen";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isComputing, setIsComputing] = useState(false);
    const router = useRouter();

    const handleAnswer = async (optionIndex: number) => {
        // Save answer
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const newAnswers = { ...answers, [currentQuestion.id]: optionIndex };
        setAnswers(newAnswers);

        // Next question or Finish
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 300); // Small delay for animation
        } else {
            // Quiz Finished
            setIsComputing(true);

            // Calculate result
            const result = calculateResult(newAnswers);
            const targetUrl = `/result/${result.primary.id}?sec=${result.secondary.id}`;

            // Save to Supabase (Fire and forget, but within the delay window)
            if (supabase) {
                // We don't await this to block UI, but the timeout gives it ample time
                supabase.from('quiz_results').insert([
                    { character_id: result.primary.id }
                ]).then(({ error }) => {
                    if (error) console.error("Error saving result:", error);
                });
            }

            // Fake processing delay to show the cool loading screen
            setTimeout(() => {
                router.push(targetUrl);
            }, 3500);
        }
    };

    if (isComputing) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center py-20 relative overflow-hidden bg-dark-bg">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.05)_0%,transparent_70%)] pointer-events-none" />

            <AnimatePresence mode="wait">
                <QuizQuestion
                    key={currentQuestionIndex}
                    question={quizQuestions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                    currentIndex={currentQuestionIndex}
                    totalQuestions={quizQuestions.length}
                />
            </AnimatePresence>
        </div>
    );
}
