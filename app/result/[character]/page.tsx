import { characters } from "@/lib/quizData";
import ResultCard from "@/components/ResultCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ character: string }>;
    searchParams: Promise<{ sec?: string }>;
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { character: characterId } = await params;
    const character = characters.find(c => c.id === characterId);

    if (!character) return {};

    return {
        title: `I am ${character.name} - ${character.role} | Stranger Things Marketing Quiz`,
        description: character.description,
        openGraph: {
            title: `I am ${character.name} - The ${character.role}`,
            description: character.description,
            // images: [`/og-images/${character.id}.png`],
        }
    };
}

export default async function ResultPage({ params, searchParams }: Props) {
    const { character: characterId } = await params;
    const { sec: secondaryId } = await searchParams;

    const primary = characters.find(c => c.id === characterId);
    const secondary = secondaryId ? characters.find(c => c.id === secondaryId) : undefined;

    if (!primary) {
        notFound();
    }

    return (
        <div className="min-h-screen py-20 px-4 flex flex-col items-center relative overflow-hidden bg-dark-bg">
            {/* Background */}
            <div
                className="absolute inset-0 opacity-20 z-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 30%, ${primary.color}, transparent 70%)` }}
            />

            <div className="relative z-10 w-full mb-12">
                <ResultCard primary={primary} secondary={secondary} />
            </div>

            <div className="text-center relative z-10 mb-20 flex gap-8">
                <a href="/quiz" className="retro-button px-6 py-3 text-sm font-bold text-white hover:text-neon-blue border-white/30 hover:border-neon-blue">
                    RETAKE TEST
                </a>
                <a href="/" className="retro-button px-6 py-3 text-sm font-bold text-white hover:text-neon-red border-white/30 hover:border-neon-red">
                    HOMEBASE
                </a>
            </div>
        </div>
    );
}
