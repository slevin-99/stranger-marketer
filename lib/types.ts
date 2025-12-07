export type CharacterID =
    | "eleven"
    | "dustin"
    | "mike"
    | "lucas"
    | "will"
    | "max"
    | "steve"
    | "nancy"
    | "jonathan"
    | "joyce"
    | "hopper"
    | "murray";

export interface Character {
    id: CharacterID;
    name: string;
    role: string;
    nickname: string;
    image: string;
    description: string;
    superpower: string;
    weakness: string;
    mantra: string;
    tools: string[];
    iconicMoment: string;
    compatible: string[];
    teamNeed: string;
    color: string;
    bgGradient: string;
}

export interface Option {
    text: string;
    points: Partial<Record<CharacterID, number>>;
}

export interface Question {
    id: number;
    question: string;
    options: Option[];
}

export interface QuizResult {
    primary: Character;
    secondary: Character;
    allScores: Record<string, number>;
}
