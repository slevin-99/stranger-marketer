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
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${character.color}20 0%, #0a0a0a 100%)`,
                        padding: '80px 60px',
                    }}
                >
                    {/* Immagine personaggio in alto */}
                    <div
                        style={{
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            border: `8px solid ${character.color}`,
                            display: 'flex',
                            marginBottom: '60px',
                            boxShadow: `0 0 60px ${character.color}80`,
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={new URL(character.image, request.url).toString()}
                            alt={character.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>

                    {/* Nome e ruolo */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '120px',
                                fontWeight: 'bold',
                                color: 'white',
                                textTransform: 'uppercase',
                                margin: '0 0 20px 0',
                                textShadow: `0 0 30px ${character.color}`,
                            }}
                        >
                            {character.name}
                        </h1>

                        <p
                            style={{
                                fontSize: '48px',
                                color: character.color,
                                margin: '0 0 40px 0',
                            }}
                        >
                            {character.nickname}
                        </p>

                        <div
                            style={{
                                fontSize: '40px',
                                color: '#888',
                                border: `3px solid ${character.color}40`,
                                padding: '20px 40px',
                                borderRadius: '15px',
                                marginBottom: '60px',
                                textTransform: 'uppercase',
                            }}
                        >
                            {character.role}
                        </div>
                    </div>

                    {/* Call to action */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 'auto',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '52px',
                                color: 'white',
                                fontWeight: 'bold',
                                margin: '0 0 30px 0',
                            }}
                        >
                            FAI ANCHE TU IL QUIZ! 👆
                        </p>

                        <p
                            style={{
                                fontSize: '44px',
                                color: '#666',
                                margin: 0,
                            }}
                        >
                            stranger-marketers.com
                        </p>
                    </div>
                </div>
            ),
            {
                width: 1080,
                height: 1920, // Formato Instagram Story
            }
        );
    } catch (e: any) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
