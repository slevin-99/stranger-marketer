import { Character } from "@/lib/types";
import { useState } from "react";
import { motion } from "framer-motion";
import { shareTexts } from "@/lib/shareTexts";

interface ShareButtonsProps {
    character: Character;
}

export default function ShareButtons({ character }: ShareButtonsProps) {
    const [toast, setToast] = useState<string | null>(null);

    // Dynamic Result URL
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://stranger-marketers.com';
    const resultUrl = `${siteUrl}/result/${character.id}`;

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleLinkedInShare = async () => {
        const text = shareTexts.linkedin(character);

        try {
            await navigator.clipboard.writeText(text);
            showToast('✅ Testo copiato! Incollalo nel post LinkedIn');

            setTimeout(() => {
                const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resultUrl)}`;
                window.open(linkedInUrl, '_blank');
            }, 1000);
        } catch (err) {
            console.error('Errore:', err);
            const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resultUrl)}`;
            window.open(linkedInUrl, '_blank');
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

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLinkedInShare}
                className="w-full py-4 px-6 bg-[#0077b5] hover:shadow-[0_0_20px_rgba(0,119,181,0.5)]
                 text-white font-bold rounded-lg uppercase tracking-wider transition-all duration-300"
            >
                CONDIVIDI SU LINKEDIN
            </motion.button>
        </div>
    );
}
