import { ImageResponse } from 'next/og';
import { characters } from '@/lib/quizData';

export const runtime = 'edge';

export default async function Image({ params }: { params: { character: string } }) {
    // Await params if necessary in newer Next.js versions, but in 16 it is often still sync or awaits automatically in handlers
    // Safely get character ID
    const { character: characterId } = await params;

    const character = characters.find((c) => c.id === characterId) || characters[0];

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0a',
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Glow Effect */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at center, ${character.color}40 0%, transparent 70%)`,
                    }}
                />

                {/* Border Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `4px solid ${character.color}`,
                        padding: '40px',
                        width: '90%',
                        height: '90%',
                        boxShadow: `0 0 50px ${character.color}40`,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        position: 'relative',
                    }}
                >
                    {/* Character Image */}
                    <div
                        style={{
                            display: 'flex',
                            width: '240px',
                            height: '240px',
                            borderRadius: '50%',
                            border: `6px solid ${character.color}`,
                            overflow: 'hidden',
                            marginBottom: '20px',
                            boxShadow: `0 0 30px ${character.color}60`,
                        }}
                    >
                        {/* Using absolute URL for OG image generation */}
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${character.image}`}
                            width="240"
                            height="240"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    <div style={{ color: 'white', fontSize: 24, marginBottom: 10, fontWeight: 'bold' }}>IO SONO</div>

                    <div
                        style={{
                            color: character.color,
                            fontSize: 80,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            textShadow: `0 0 20px ${character.color}`,
                            marginBottom: 10,
                            lineHeight: 1,
                        }}
                    >
                        {character.name}
                    </div>

                    <div
                        style={{
                            color: 'white',
                            fontSize: 32,
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            marginBottom: 30,
                            textAlign: 'center',
                        }}
                    >
                        {character.role}
                    </div>

                    <div
                        style={{
                            color: '#b0b0b0',
                            fontSize: 20,
                            fontStyle: 'italic',
                            textAlign: 'center',
                            maxWidth: '80%',
                            marginBottom: 40,
                        }}
                    >
                        "{character.mantra}"
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 30,
                        }}
                    >
                        <div style={{ color: character.color, fontSize: 18, marginBottom: 5 }}>CHE MARKETER DI STRANGER THINGS SEI?</div>
                        <div style={{ color: '#666', fontSize: 16 }}>stranger-marketers.com</div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
