import { ImageResponse } from '@vercel/og';
import { characters } from '@/lib/quizData';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const characterId = searchParams.get('character');

        // Find character
        const character = characters.find(c => c.id === characterId);

        if (!character) {
            return new Response('Character not found', { status: 404 });
        }

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
                        backgroundImage: `radial-gradient(circle at 50% 50%, ${character.color}40, #0a0a0a 70%)`,
                        fontFamily: 'sans-serif',
                    }}
                >
                    {/* Main Container */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `4px solid ${character.color}`,
                            padding: '60px 80px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                        }}
                    >
                        {/* IO SONO */}
                        <div style={{ color: 'white', fontSize: 32, marginBottom: 20, fontWeight: 'bold' }}>
                            IO SONO
                        </div>

                        {/* Character Name */}
                        <div
                            style={{
                                color: character.color,
                                fontSize: 100,
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                marginBottom: 20,
                                lineHeight: 1,
                            }}
                        >
                            {character.name}
                        </div>

                        {/* Role */}
                        <div
                            style={{
                                color: 'white',
                                fontSize: 36,
                                textTransform: 'uppercase',
                                letterSpacing: '6px',
                                marginBottom: 40,
                                textAlign: 'center',
                            }}
                        >
                            {character.role}
                        </div>

                        {/* Mantra */}
                        <div
                            style={{
                                color: '#888',
                                fontSize: 24,
                                fontStyle: 'italic',
                                textAlign: 'center',
                                maxWidth: '80%',
                            }}
                        >
                            "{character.mantra}"
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ color: character.color, fontSize: 20, marginBottom: 8 }}>
                            CHE MARKETER DI STRANGER THINGS SEI?
                        </div>
                        <div style={{ color: '#555', fontSize: 18 }}>
                            stranger-marketers.com
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        console.log(`OG Image Generation Error: ${message}`);
        return new Response(`Failed to generate the image: ${message}`, {
            status: 500,
        });
    }
}

