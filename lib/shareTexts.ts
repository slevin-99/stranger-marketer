import { Character } from "./types";

export const shareTexts = {
    linkedin: (character: Character) => {
        const resultUrl = `https://stranger-marketers.com/result/${character.id}`;

        return `🎬 Ho appena scoperto di essere ${character.name}, "${character.nickname}" nel team marketing di Hawkins!

✨ Il mio superpotere: ${character.superpower}
⚠️ Il mio punto debole: ${character.weakness}

${character.mantra ? `💭 Il mio mantra: "${character.mantra}"` : ''}

Quale personaggio di Stranger Things sei tu nel marketing? 👇

🎯 Fai il quiz qui: ${resultUrl}

#Marketing #StrangerThings #DigitalMarketing #MarketingQuiz #ContentStrategy`;
    },

    twitter: (character: Character) => `🎯 Sono ${character.name} - ${character.nickname}!

✨ ${character.superpower}
⚠️ ${character.weakness}

💭 "${character.mantra}"

Fai anche tu il quiz 👉 https://stranger-marketers.com/

#StrangerThings #Marketing`,

    instagram: (character: Character) => `🎬 RISULTATO DEL QUIZ 🎬

Sono ${character.name}
"${character.nickname}"

${character.description.slice(0, 100)}...

Swipe up per fare anche tu il quiz! 👆
(o cerca il link in bio)

#StrangerThings #Marketing #Quiz #DigitalMarketing`,

    whatsapp: (character: Character) => `🎬 Ho fatto questo quiz folle su Stranger Things e marketing!

Sono risultato ${character.name} - "${character.nickname}" 😂

${character.superpower ? `Il mio superpotere: ${character.superpower}` : ''}

Provalo anche tu: https://stranger-marketers.com/`,
};
