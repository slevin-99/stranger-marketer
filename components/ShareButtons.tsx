import { Character } from "@/lib/types";
import { useState } from "react";
import { motion } from "framer-motion";
import { shareTexts } from "@/lib/shareTexts";
import { getShareUrl, copyToClipboard } from "@/lib/shareUtils";

interface ShareButtonsProps {
    character: Character;
}

export default function ShareButtons({ character }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);

    // Dynamic Result URL
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://stranger-marketers.com';
    const resultUrl = `${siteUrl}/result/${character.id}`;

    const handleShare = (platform: 'linkedin' | 'twitter' | 'whatsapp') => {
        let text = '';
        if (platform === 'linkedin') text = shareTexts.linkedin(character);
        if (platform === 'twitter') text = shareTexts.twitter(character);
        if (platform === 'whatsapp') text = shareTexts.whatsapp(character);

        const url = getShareUrl(platform, text, resultUrl);

        if (platform === 'linkedin') {
            copyToClipboard(text);
            setCopied(true); // Reusing the "Copied" state for feedback
            setTimeout(() => setCopied(false), 3000);
            window.open(url, '_blank');
        } else {
            window.open(url, '_blank');
        }
    };

    const handleInstagramShare = () => {
        // Since Instagram sharing from web is limited, we point to the story download
        // Or keeping it simple: just download the story image
        window.open(`/api/story?character=${character.id}`, '_blank');
    };

    const handleDownloadCard = () => {
        // Use the OG image endpoint for download
        setDownloading(true);
        const link = document.createElement('a');
        link.href = `/api/story?character=${character.id}`; // Downloading the vertical story version as "Card"
        link.download = `stranger-marketer-${character.id}-story.png`;
        link.click();
        setDownloading(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(resultUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4 mt-8 w-full">
            {copied && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-neon-green text-xs font-mono mb-2"
                >
                    TESTO COPIATO! INCOLLALO NEL TUO POST
                </motion.div>
            )}

            <div className="flex gap-3 justify-center flex-wrap">
                <ShareButton
                    label="LinkedIn"
                    onClick={() => handleShare('linkedin')}
                    color="bg-[#0077b5] hover:shadow-[0_0_15px_#0077b5]"
                />
                <ShareButton
                    label="Story"
                    onClick={() => handleDownloadCard()}
                    color="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:shadow-[0_0_15px_#dc2743]"
                />
                <ShareButton
                    label="X / Twitter"
                    onClick={() => handleShare('twitter')}
                    color="bg-black border border-white/20 hover:border-white"
                />
                <ShareButton
                    label="WhatsApp"
                    onClick={() => handleShare('whatsapp')}
                    color="bg-[#25D366] hover:shadow-[0_0_15px_#25D366]"
                />
            </div>

            <div className="flex gap-3 justify-center">
                <button
                    onClick={handleCopyLink}
                    className="text-xs font-mono text-white/50 hover:text-white underline decoration-dotted underline-offset-4 transition-colors"
                >
                    {copied ? "LINK COPIATO!" : "COPIA LINK RISULTATO"}
                </button>
            </div>
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
