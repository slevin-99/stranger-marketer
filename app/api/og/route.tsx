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

        // Font loading (basic implementation using standard fonts for now to speed up)
        // Ideally we would load custom fonts here.

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
                        backgroundImage: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)`,
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
                            background: `radial-gradient(circle at 50% 50%, ${character.color}40, transparent 70%)`,
                            opacity: 0.4,
                        }}
                    />

                    {/* Content Container */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '40px',
                            zIndex: 10,
                            background: 'rgba(0,0,0,0.6)',
                            border: `1px solid ${character.color}60`,
                            borderRadius: '20px',
                            padding: '40px 60px',
                            boxShadow: `0 0 50px ${character.color}40`,
                        }}
                    >
                        {/* Image */}
                        <img
                            src={new URL(character.image, request.url).toString()}
                            alt={character.name}
                            style={{
                                width: '250px',
                                height: '250px',
                                borderRadius: '50%',
                                border: `4px solid ${character.color}`,
                                objectFit: 'cover',
                            }}
                        />

                        {/* Text Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div
                                style={{
                                    fontSize: '80px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    color: 'white',
                                    lineHeight: 1,
                                    marginBottom: '10px',
                                    textShadow: `0 0 20px ${character.color}`,
                                }}
                            >
                                {character.name}
                            </div>
                            <div
                                style={{
                                    fontSize: '30px',
                                    color: '#00d4ff',
                                    textTransform: 'uppercase',
                                    letterSpacing: '4px',
                                    marginBottom: '20px',
                                    fontFamily: 'monospace',
                                }}
                            >
                                {character.nickname}
                            </div>
                            <div
                                style={{
                                    fontSize: '24px',
                                    color: character.color,
                                    border: `1px solid ${character.color}`,
                                    padding: '8px 20px',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                }}
                            >
                                ROLE: {character.role}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Watermark */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '30px',
                            fontSize: '24px',
                            color: '#666',
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                        }}
                    >
                        stranger-marketers.com
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
