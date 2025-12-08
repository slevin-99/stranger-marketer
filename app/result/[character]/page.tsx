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

    const siteUrl = 'https://stranger-marketers.com'; // In production this should be env var

    return {
        title: `Sono ${character.name} nel mondo del Marketing! | Stranger Marketers`,
        description: `Ho scoperto di essere ${character.role} - Fai il quiz!`,
        openGraph: {
            title: `Sono ${character.name} nel mondo del Marketing!`,
            description: `Ho scoperto di essere ${character.role} - Fai il quiz!`,
            images: [
                {
                    url: `${siteUrl}/api/og?character=${character.id}&v=2`,
                    width: 1200,
                    height: 630,
                    alt: `${character.name} - ${character.role}`,
                }
            ],
            type: 'website',
            url: `${siteUrl}/result/${character.id}`,
            siteName: 'Stranger Marketers',
        },
        twitter: {
            card: 'summary_large_image',
            title: `Sono ${character.name} nel mondo del Marketing!`,
            description: `Ho scoperto di essere ${character.role} - Fai il quiz!`,
            images: [`${siteUrl}/api/og?character=${character.id}&v=2`],
        },
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
