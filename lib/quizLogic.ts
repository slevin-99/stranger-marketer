import { characters, quizQuestions } from "./quizData";
import { CharacterID, QuizResult } from "./types";

export function calculateResult(answers: Record<number, number>): QuizResult {
    const scores: Record<string, number> = {};

    // Initialize all characters to 0
    characters.forEach(char => scores[char.id] = 0);

    // Calculate scores
    Object.entries(answers).forEach(([questionId, optionIndex]) => {
        const question = quizQuestions.find(q => q.id === parseInt(questionId));
        const option = question?.options[optionIndex];

        if (option?.points) {
            Object.entries(option.points).forEach(([charId, points]) => {
                if (scores[charId] !== undefined) {
                    scores[charId] += points;
                }
            });
        }
    });

    // Find winner
    const sortedScores = Object.entries(scores)
        .sort(([, a], [, b]) => b - a);

    const winnerId = sortedScores[0][0] as CharacterID;
    const secondaryId = sortedScores[1][0] as CharacterID;

    const primary = characters.find(c => c.id === winnerId);
    const secondary = characters.find(c => c.id === secondaryId);

    if (!primary || !secondary) {
        throw new Error("Could not calculate result");
    }

    return {
        primary,
        secondary,
        allScores: scores
    };
}
