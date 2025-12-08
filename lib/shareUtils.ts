export interface ShareData {
    title: string;
    text: string;
    url: string;
    files?: File[];
}

// Controlla se Web Share API è disponibile
export const canUseWebShare = (): boolean => {
    return typeof navigator !== 'undefined' &&
        navigator.share !== undefined;
};

// Controlla se può condividere file (per Instagram Stories)
export const canShareFiles = (): boolean => {
    return canUseWebShare() &&
        navigator.canShare !== undefined &&
        navigator.canShare({ files: [] });
};

// Condivisione nativa
export const nativeShare = async (data: ShareData): Promise<boolean> => {
    if (!canUseWebShare()) {
        return false;
    }

    try {
        await navigator.share({
            title: data.title,
            text: data.text,
            url: data.url,
            ...(data.files && { files: data.files })
        });
        return true;
    } catch (err) {
        // L'utente ha annullato o errore
        // Ignore AbortError (user cancelled)
        if (err instanceof Error && err.name !== 'AbortError') {
            console.error('Errore share:', err);
        }
        return false;
    }
};

// Genera file immagine dalla URL (per Instagram Stories)
export const urlToFile = async (url: string, filename: string): Promise<File | null> => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    } catch (err) {
        console.error('Errore conversione immagine:', err);
        return null;
    }
};

export const getShareUrl = (platform: 'linkedin' | 'twitter' | 'whatsapp', text: string, url: string) => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
        case 'linkedin':
            // LinkedIn condivide solo URL, il testo va copiato manualmente
            return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

        case 'twitter':
            return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

        case 'whatsapp':
            return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;

        default:
            return url;
    }
};

export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};
