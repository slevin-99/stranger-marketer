import { Character } from "@/lib/types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shareTexts } from "@/lib/shareTexts";
import { canUseWebShare, nativeShare, canShareFiles, urlToFile } from '@/lib/shareUtils';

interface ShareButtonsProps {
    character: Character;
}

export default function ShareButtons({ character }: ShareButtonsProps) {
    const [toast, setToast] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Dynamic Result URL
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://stranger-marketers.com';
    const resultUrl = `${siteUrl}/result/${character.id}`;

    useEffect(() => {
        setIsMobile(canUseWebShare());
    }, []);

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleLinkedInShare = async () => {
        const text = shareTexts.linkedin(character);

        // ALWAYS use the Copy + Open flow for LinkedIn
        // This ensures specific targeting of the LinkedIn app/site and proper text copying
        // instead of the generic system share sheet.
        try {
            await navigator.clipboard.writeText(text);
            showToast('✅ Testo copiato! Incollalo nel post LinkedIn');

            setTimeout(() => {
                const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resultUrl)}`;
                window.open(linkedInUrl, '_blank');
            }, 1000);
        } catch (err) {
            console.error('Errore:', err);
            // Backup functionality if clipboard fails
            const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resultUrl)}`;
            window.open(linkedInUrl, '_blank');
        }
    };

    const handleTwitterShare = async () => {
        const text = shareTexts.twitter(character);

        // MOBILE: usa Web Share API
        if (isMobile) {
            const success = await nativeShare({
                title: `I'm ${character.name}`,
                text: text,
                url: resultUrl
            });
            if (success) return;
        }

        // DESKTOP: apri Twitter web
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(resultUrl)}`;
        window.open(twitterUrl, '_blank');
    };

    const handleWhatsAppShare = async () => {
        const text = shareTexts.whatsapp(character);

        // MOBILE: usa Web Share API
        if (isMobile) {
            const success = await nativeShare({
                title: `Quiz Stranger Things Marketing`,
                text: `${text}\n\n${resultUrl}`,
                url: '' // Già incluso nel text per WhatsApp
            });
            if (success) return;
        }

        // DESKTOP: Web WhatsApp
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + resultUrl)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleInstagramShare = async () => {
        // Su mobile, prova a condividere l'immagine direttamente
        if (isMobile && canShareFiles()) {
            try {
                // URL dell'immagine della story
                const storyImageUrl = `/api/story?character=${character.id}`;

                // Converti in File
                const imageFile = await urlToFile(storyImageUrl, `stranger-marketer-${character.id}-story.png`);

                if (imageFile) {
                    const success = await nativeShare({
                        title: `I'm ${character.name}!`,
                        text: shareTexts.instagram(character),
                        url: resultUrl,
                        files: [imageFile]
                    });

                    if (success) return;
                }
            } catch (err) {
                console.error('Errore condivisione immagine:', err);
            }
        }

        // FALLBACK: scarica l'immagine
        const storyImageUrl = `/api/story?character=${character.id}`;

        const link = document.createElement('a');
        link.href = storyImageUrl;
        link.download = `stranger-marketer-${character.id}-story.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('📸 Immagine scaricata! Aprilo in Instagram e condividila nella tua Story');
    };

    const handleGenericShare = async () => {
        const text = shareTexts.linkedin(character); // Generic text uses linkedin template as it is most complete

        if (isMobile) {
            await nativeShare({
                title: `I'm ${character.name} - Stranger Things Marketing Quiz`,
                text: text,
                url: resultUrl
            });
        } else {
            // Copia link
            await navigator.clipboard.writeText(resultUrl);
            showToast('🔗 Link copiato negli appunti!');
        }
    };

    return (
        <div className="flex flex-col gap-4 mt-8 w-full relative">
            {toast && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
                  bg-[#0077b5] text-white px-6 py-4 rounded-lg shadow-[0_0_30px_rgba(0,119,181,0.5)]
                  border border-white/20
                  animate-in fade-in slide-in-from-top-2 duration-300 font-bold text-sm max-w-[90vw] text-center">
                    {toast}
                </div>
            )}

            {isMobile && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenericShare}
                    className="w-full py-4 px-6 bg-gradient-to-r from-neon-blue to-neon-purple 
                     text-white font-bold rounded-lg uppercase tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                >
                    📱 CONDIVIDI RISULTATO
                </motion.button>
            )}

            <div className="grid grid-cols-2 gap-3">
                <ShareButton
                    label="LinkedIn"
                    onClick={handleLinkedInShare}
                    color="bg-[#0077b5] hover:shadow-[0_0_15px_#0077b5]"
                />
                <ShareButton
                    label="Instagram"
                    onClick={handleInstagramShare}
                    color="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:shadow-[0_0_15px_#dc2743]"
                />
                <ShareButton
                    label="X / Twitter"
                    onClick={handleTwitterShare}
                    color="bg-black border border-white/20 hover:border-white"
                />
                <ShareButton
                    label="WhatsApp"
                    onClick={handleWhatsAppShare}
                    color="bg-[#25D366] hover:shadow-[0_0_15px_#25D366]"
                />
            </div>

            <button
                onClick={handleGenericShare}
                className="w-full py-2 text-xs font-mono text-white/50 hover:text-white underline decoration-dotted underline-offset-4 transition-colors"
            >
                {isMobile ? "COPIA SOLO IL LINK" : "COPIA LINK RISULTATO"}
            </button>
        </div>
    );
}

function ShareButton({ label, onClick, color, variant = 'solid' }: { label: string, onClick: () => void, color: string, variant?: 'solid' | 'outline' }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`px-6 py-3 rounded uppercase font-bold text-xs tracking-wider transition-all duration-300 ${color} ${variant === 'outline' ? '' : 'text-white'}`}
        >
            {label}
        </motion.button>
    );
}
