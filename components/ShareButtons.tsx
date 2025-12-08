"use client";

import { Character } from "@/lib/types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ShareButtonsProps {
    character: Character;
}

export default function ShareButtons({ character }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [shareFile, setShareFile] = useState<File | null>(null);

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/result/${character.id}` : '';
    const shareText = `Sono ${character.name} - ${character.role}. Che Marketer di Stranger Things sei?`;

    // Generate blob on mount
    useEffect(() => {
        let isMounted = true;

        const prepareShareImage = async () => {
            const blob = await generateImageBlob();
            if (blob && isMounted) {
                const file = new File([blob], `stranger-marketer-${character.id}.png`, { type: 'image/png' });
                setShareFile(file);
            }
        };

        prepareShareImage();

        return () => { isMounted = false; };
    }, [character]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper to generate the image blob
    const generateImageBlob = async (): Promise<Blob | null> => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1080;
            canvas.height = 1080;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;

            // Background - Dark gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
            gradient.addColorStop(0, '#0a0a0a');
            gradient.addColorStop(1, '#1a1a1a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1080, 1080);

            // Accent colored glow
            const glow = ctx.createRadialGradient(540, 540, 100, 540, 540, 600);
            glow.addColorStop(0, character.color + '40'); // 25% opacity
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, 1080, 1080);

            // Border Effect
            ctx.strokeStyle = character.color;
            ctx.lineWidth = 4;
            ctx.strokeRect(40, 40, 1000, 1000);

            // Image Loading
            const img = new Image();
            img.src = character.image;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            // Draw Character Image (Circle)
            const centerX = 540;
            const centerY = 350;
            const radius = 200;

            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            // Draw image covering the circle
            // Calculate aspect ratio to cover
            const scale = Math.max(radius * 2 / img.width, radius * 2 / img.height);
            const w = img.width * scale;
            const h = img.height * scale;
            ctx.drawImage(img, centerX - w / 2, centerY - h / 2, w, h);

            // Inner Border for image
            ctx.lineWidth = 10;
            ctx.strokeStyle = character.color;
            ctx.stroke();
            ctx.restore();

            // Text Content
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';

            // Title
            ctx.font = 'bold 60px Arial';
            ctx.fillText("IO SONO", 540, 100);

            // Name
            ctx.font = 'bold 120px Arial'; // Slightly smaller to fit
            ctx.fillStyle = character.color;
            ctx.shadowColor = character.color;
            ctx.shadowBlur = 20;
            ctx.fillText(character.name.toUpperCase(), 540, 680); // Shifted down
            ctx.shadowBlur = 0; // Reset shadow

            // Role
            ctx.fillStyle = '#ffffff';
            ctx.font = '40px Courier New';
            ctx.fillText(character.role.toUpperCase(), 540, 750);

            // Quote
            ctx.font = 'italic 36px Arial';
            ctx.fillStyle = '#b0b0b0';
            // Simple wrap for quote (manual for canvas)
            const words = character.mantra.split(' ');
            let line = '';
            let y = 850;
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > 800 && n > 0) {
                    ctx.fillText(line, 540, y);
                    line = words[n] + ' ';
                    y += 45;
                }
                else {
                    line = testLine;
                }
            }
            ctx.fillText(line, 540, y);

            // Footer
            ctx.font = '24px Courier New';
            ctx.fillStyle = character.color;
            ctx.fillText("CHE MARKETER DI STRANGER THINGS SEI?", 540, 1030);

            // Texture overlay (scanlines)
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            for (let i = 0; i < 1080; i += 4) {
                ctx.fillRect(0, i, 1080, 2);
            }

            return new Promise((resolve) => {
                canvas.toBlob((blob) => resolve(blob), 'image/png');
            });
        } catch (e) {
            console.error("Failed to generate image", e);
            return null;
        }
    };

    const handleShare = async (platform: 'linkedin' | 'instagram' | 'twitter') => {
        // 1. Try Native Share (System Sheet) - BEST FOR MOBILE APPS
        // This allows sharing Image + Text + URL directly to apps (Instagram, LinkedIn, etc.)
        if (shareFile && navigator.canShare && navigator.canShare({ files: [shareFile] })) {
            try {
                // Determine strictly necessary data. 
                // Note: Some apps (like Instagram) ignore text/url if a file is present.
                // Others (LinkedIn) might handle all.
                // We send everything we can; the OS filters what the target app accepts.
                await navigator.share({
                    files: [shareFile],
                    title: 'Stranger Things Marketer Quiz',
                    text: shareText,
                    url: shareUrl,
                });
                return; // Success!
            } catch (err) {
                // User cancelled or share failed.
                console.log('Native share failed/cancelled', err);
                // If failed (not cancelled), we might want to fall through? 
                // But usually 'cancelled' throws an error too.
                // We'll stop here to avoid annoyed fallback behavior if user just clicked 'X'.
                if ((err as Error).name !== 'AbortError') {
                    // If it was a real error, maybe try fallback?
                    // Let's fall through only if it wasn't an abort.
                } else {
                    return;
                }
            }
        }

        // 2. Desktop / Fallback Behavior

        // LinkedIn / Twitter: Web Intents (Text + URL only, no image file)
        if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
            return;
        }
        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
            return;
        }

        // Instagram Fallback: Download Image
        if (platform === 'instagram') {
            downloadImage();
            // Optional: alert user instructions for desktop?
        }
    };

    const downloadImage = async () => {
        if (shareFile) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(shareFile);
            link.download = shareFile.name;
            link.click();
        } else {
            // Fallback generate
            setDownloading(true);
            const blob = await generateImageBlob();
            setDownloading(false);
            if (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `stranger-marketer-${character.id}.png`;
                link.click();
            }
        }
    };

    return (
        <div className="flex flex-col gap-4 mt-8">
            <div className="flex gap-4 justify-center">
                <ShareButton
                    label="LinkedIn"
                    onClick={() => handleShare('linkedin')}
                    color="bg-[#0077b5]"
                />
                <ShareButton
                    label="Instagram"
                    onClick={() => handleShare('instagram')}
                    color={shareFile ? "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" : "bg-white/10 opacity-50 cursor-not-allowed"}
                // Disable visual feedback if not ready? Or just handle in click.
                />
                <ShareButton
                    label="X / Twitter"
                    onClick={() => handleShare('twitter')}
                    color="bg-black border border-white/20"
                />
            </div>
            <div className="flex gap-4 justify-center">
                <ShareButton
                    label={downloading ? "Generazione..." : "Scarica Card"}
                    onClick={downloadImage}
                    color="bg-neon-red/20 border border-neon-red text-neon-red hover:bg-neon-red hover:text-white"
                    variant="outline"
                />
                <ShareButton
                    label={copied ? "Copiato!" : "Copia Link"}
                    onClick={handleCopyLink}
                    color="bg-white/10 border border-white/20"
                    variant="outline"
                />
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
