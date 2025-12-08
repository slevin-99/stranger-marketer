import { ImageResponse } from '@vercel/og';
import { characters } from '@/lib/quizData';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const characterId = searchParams.get('character');
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
                        backgroundImage: `linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)`,
                        position: 'relative',
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }}
                >
                    {/* Background Glow */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `radial-gradient(circle at 50% 30%, ${character.color}40, transparent 60%)`,
                            opacity: 0.5,
                        }}
                    />

                    {/* Header */}
                    <div style={{ fontSize: 60, color: 'white', marginBottom: 60, textTransform: 'uppercase', letterSpacing: '4px', textAlign: 'center' }}>
                        STRANGER MARKETERS <br /> QUIZ
                    </div>

                    {/* Card */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: 'rgba(0,0,0,0.7)',
                            border: `2px solid ${character.color}`,
                            padding: '60px',
                            borderRadius: '40px',
                            boxShadow: `0 0 80px ${character.color}40`,
                            marginBottom: '80px',
                            width: '80%',
                        }}
                    >
                        <img
                            src={new URL(character.image, request.url).toString()}
                            alt={character.name}
                            style={{
                                width: '400px',
                                height: '400px',
                                borderRadius: '50%',
                                border: `8px solid ${character.color}`,
                                objectFit: 'cover',
                                marginBottom: '40px',
                            }}
                        />
                        <div
                            style={{
                                fontSize: '80px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                color: 'white',
                                marginBottom: '20px',
                                textShadow: `0 0 20px ${character.color}`,
                                textAlign: 'center',
                            }}
                        >
                            {character.name}
                        </div>
                        <div
                            style={{
                                fontSize: '32px',
                                color: '#00d4ff',
                                textTransform: 'uppercase',
                                letterSpacing: '6px',
                                textAlign: 'center',
                                fontFamily: 'monospace',
                            }}
                        >
                            {character.nickname}
                        </div>
                    </div>

                    {/* CTA */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{ fontSize: '40px', fontWeight: 'bold', color: 'white' }}>
                            FAI ANCHE TU IL QUIZ
                        </div>
                        <div
                            style={{
                                fontSize: '32px',
                                color: character.color,
                                border: `2px solid ${character.color}`,
                                padding: '15px 40px',
                                borderRadius: '50px',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                background: 'rgba(255,255,255,0.1)'
                            }}
                        >
                            stranger-marketers.com
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 80, fontSize: 30, color: 'rgba(255,255,255,0.5)' }}>
                        LINK IN BIO
                    </div>
                </div>
            ),
            {
                width: 1080,
                height: 1920,
            },
        );
    } catch (e: any) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
