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
