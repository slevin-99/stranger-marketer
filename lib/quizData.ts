import { Character, Question } from "./types";

export const characters: Character[] = [
    {
        id: "eleven",
        name: "Eleven",
        role: "Data Analyst",
        nickname: "The Data Whisperer",
        image: "/characters/eleven.jpg",
        description: "Non servono parole, i dati parlano nella tua mente. Pieghi i grafici di Analytics con il solo pensiero e chiudi i portali dei bug prima che distruggano il sito.",
        superpower: "Trovare correlazioni che nessuno vede",
        weakness: "Ti perdi nelle analisi e dimentichi la riunione",
        mantra: "Ma cosa dicono i dati?",
        tools: ["Google Analytics", "Python", "SQL", "Looker Studio", "BigQuery"],
        iconicMoment: "Quando trovi finalmente quel bug nel tracciamento e tutto ha senso",
        compatible: ["Dustin (Growth Hacker)", "Nancy (Content Strategist)", "Murray (SEO Specialist)"],
        teamNeed: "Ti serve un Will per tradurre i dati in creatività",
        color: "#ff0040",
        bgGradient: "from-red-900/20 to-purple-900/20"
    },
    {
        id: "dustin",
        name: "Dustin",
        role: "Growth Hacker",
        nickname: "The Creative Problem Solver",
        image: "/characters/dustin.jpg",
        description: "Curiosità insaziabile e denti da latte (metaforici). Se c'è una scorciatoia tecnica o un hack per scalare la crescita, tu l'hai già trovato. Grrrrr.",
        superpower: "Trovare growth hack che nessuno ha mai provato",
        weakness: "A volte le tue idee sono troppo avanti per il cliente",
        mantra: "Se non è hackerabile, non vale la pena farlo",
        tools: ["Zapier", "n8n", "Python Scripts", "API di tutto", "Fogli di calcolo impossibili"],
        iconicMoment: "Quando automatizzi in 2 ore quello che richiedeva 2 giorni di lavoro",
        compatible: ["Eleven (Data Analyst)", "Lucas (Performance)", "Murray (SEO)"],
        teamNeed: "Ti serve uno Steve per rendere presentabili le tue idee folli",
        color: "#00d4ff",
        bgGradient: "from-blue-900/20 to-cyan-900/20"
    },
    {
        id: "mike",
        name: "Mike",
        role: "Social Media Manager",
        nickname: "The Always-On Connector",
        image: "/characters/mike.png",
        description: "Il cuore del Party. Tieni unita la community col walkie-talkie sempre acceso. Pianifichi le campagne nello scantinato e non lasci indietro nessun follower.",
        superpower: "Sapere sempre cosa sta succedendo, sempre",
        weakness: "Burnout da notifiche costanti",
        mantra: "Se non è postato, non è successo",
        tools: ["Hootsuite", "Later", "Canva", "Notion per content calendar", "Il telefono anche a cena"],
        iconicMoment: "Quando il post esplode organicamente e non sai nemmeno perché",
        compatible: ["Will (Content Creator)", "Max (UX Designer)", "Nancy (Strategist)"],
        teamNeed: "Ti serve una Joyce per ricordarti di staccare ogni tanto",
        color: "#39ff14",
        bgGradient: "from-green-900/20 to-emerald-900/20"
    },
    {
        id: "lucas",
        name: "Lucas",
        role: "Performance Marketing Specialist",
        nickname: "The ROI Sniper",
        image: "/characters/lucas.png",
        description: "Il Ranger con la fionda carica di budget. Scettico sulle vanity metrics, guardi solo ai fatti. Quando miri al target, fai centro. Sempre.",
        superpower: "Ottimizzare campagne fino all'ultimo centesimo",
        weakness: "A volte dimentichi che il branding non è sempre misurabile subito",
        mantra: "Show me the ROAS",
        tools: ["Google Ads", "Meta Ads Manager", "GA4", "Excel dei budget", "Decine di UTM"],
        iconicMoment: "Quando scali la campagna e il ROAS rimane stabile",
        compatible: ["Eleven (Data Analyst)", "Dustin (Growth)", "Steve (Brand Manager)"],
        teamNeed: "Ti serve un Will per creare ad creative che convertono",
        color: "#ff6b00",
        bgGradient: "from-orange-900/20 to-red-900/20"
    },
    {
        id: "will",
        name: "Will",
        role: "Content Creator",
        nickname: "The Dimension Traveler",
        image: "/characters/will.png",
        description: "Hai la 'Vera Vista'. Riesci a vedere i trend nel Sottosopra prima degli altri. Sensibile e visionario, disegni mappe che guidano il brand fuori dal buio.",
        superpower: "Creare contenuti che toccano le emozioni",
        weakness: "Le tue idee migliori arrivano sempre 5 minuti dopo la riunione",
        mantra: "Ma se provassimo così...?",
        tools: ["Adobe Creative Suite", "Final Cut", "Procreate", "Notion per idee alle 3am", "Cuffie noise-cancelling"],
        iconicMoment: "Quando il tuo contenuto diventa virale e il cliente ti chiede 'altre 20 così'",
        compatible: ["Mike (Social Media)", "Jonathan (Video Maker)", "Nancy (Strategist)"],
        teamNeed: "Ti serve un Lucas per capire quale contenuto converte davvero",
        color: "#9d4edd",
        bgGradient: "from-purple-900/20 to-pink-900/20"
    },
    {
        id: "max",
        name: "Max",
        role: "UX Designer",
        nickname: "The Straight Shooter",
        image: "/characters/max.png",
        description: "Zoomer su skate che odia l'interfaccia lenta. Sei diretta, veloce e sai che l'esperienza utente deve scorrere liscia, o sono guai seri.",
        superpower: "Vedere friction che gli altri non vedono",
        weakness: "A volte sei troppo diretta e ferisci l'ego del developer",
        mantra: "Se l'utente non capisce, è colpa tua",
        tools: ["Figma", "Figjam", "Hotjar", "Maze", "Post-it ovunque"],
        iconicMoment: "Quando il redesign aumenta la conversion del 40% e puoi dire 'te l'avevo detto'",
        compatible: ["Mike (Social Media)", "Steve (Brand)", "Nancy (Strategist)"],
        teamNeed: "Ti serve un Jonathan per tradurre la tua vision in visual forte",
        color: "#e63946",
        bgGradient: "from-red-900/20 to-pink-900/20"
    },
    {
        id: "steve",
        name: "Steve",
        role: "Brand Manager",
        nickname: "The Reinvented King",
        image: "/characters/steve.png",
        description: "Capelli perfetti e mazza chiodata pronta. Proteggi i clienti (i tuoi 'bambini') dai pericoli del mercato e ti prendi le botte al posto del team.",
        superpower: "Mantenere coerenza del brand anche nel caos",
        weakness: "A volte sei troppo protettivo e blocchi l'innovazione",
        mantra: "Questo è off-brand, rifacciamo",
        tools: ["Brand Guidelines (stampate e incorniciate)", "Pantone book", "Brandfolder", "Keynote", "Specchio"],
        iconicMoment: "Quando vedi il logo stirato in una presentazione e inizi a tremare",
        compatible: ["Max (UX)", "Nancy (Strategist)", "Jonathan (Visual)"],
        teamNeed: "Ti serve un Dustin per spingerti fuori dalla comfort zone",
        color: "#ffd60a",
        bgGradient: "from-yellow-900/20 to-amber-900/20"
    },
    {
        id: "nancy",
        name: "Nancy",
        role: "Content Strategist",
        nickname: "The Investigative Planner",
        image: "/characters/nancy.png",
        description: "Non ti fermi finché non trovi la verità (o la keyword giusta). Indaghi, scrivi e scavi a fondo finché il contenuto non si posiziona in prima pagina.",
        superpower: "Trovare l'angolo narrativo che nessuno aveva visto",
        weakness: "Overthinking every single piece of content",
        mantra: "Qual è l'obiettivo di questo contenuto?",
        tools: ["Notion", "Airtable", "Miro", "Google Docs versione enterprise", "Troppi framework"],
        iconicMoment: "Quando il contenuto pianificato 3 mesi fa performa esattamente come avevi previsto",
        compatible: ["Eleven (Data)", "Mike (Social)", "Will (Creator)"],
        teamNeed: "Ti serve un Dustin per eseguire velocemente senza overthinking",
        color: "#4cc9f0",
        bgGradient: "from-cyan-900/20 to-blue-900/20"
    },
    {
        id: "jonathan",
        name: "Jonathan",
        role: "Photographer / Video Maker",
        nickname: "The Invisible Observer",
        image: "/characters/jonathan.png",
        description: "Osservatore silenzioso. Mentre gli altri urlano, tu scatti la foto perfetta dalla penombra. Sai sviluppare la strategia nella camera oscura.",
        superpower: "Trovare la shot perfetta al primo tentativo",
        weakness: "Parli poco e a volte il cliente vorrebbe più comunicazione",
        mantra: "La luce è tutto",
        tools: ["Sony/Canon", "DaVinci Resolve", "Adobe Premiere", "Lightroom", "Gimbal sempre pronto"],
        iconicMoment: "Quando il cliente vede il montato finale e dice 'wow, è ESATTAMENTE quello che volevo' (anche se non lo sapeva)",
        compatible: ["Will (Creator)", "Max (UX)", "Steve (Brand)"],
        teamNeed: "Ti serve un Mike per promuovere il tuo lavoro perché tu non lo farai mai",
        color: "#7209b7",
        bgGradient: "from-purple-900/20 to-violet-900/20"
    },
    {
        id: "joyce",
        name: "Joyce",
        role: "CMO / Marketing Director",
        nickname: "The Anxious Orchestrator",
        image: "/characters/joyce.png",
        description: "Ansia? Sì. Resa? Mai. Unisci i puntini (e le luci di Natale) per trovare la soluzione quando tutto sembra perduto. Parli con i muri pur di rispettare la deadline.",
        superpower: "Vedere pattern e connessioni che tengono insieme la strategia",
        weakness: "L'ansia è il tuo stato naturale",
        mantra: "Dobbiamo proteggere il team e i risultati",
        tools: ["Slack sempre aperto", "Dashboard su dashboard", "Fogli Excel finanziari", "Caffè IV", "Calendario tetris"],
        iconicMoment: "Quando presenti i risultati trimestrali e sono sopra le aspettative (ma eri comunque in ansia)",
        compatible: ["Tutti (li gestisci tutti)", "Hopper (CEO)", "Nancy (Strategist)"],
        teamNeed: "Ti serve un Hopper che ti dica 'va tutto bene, respira'",
        color: "#d00000",
        bgGradient: "from-red-900/20 to-rose-900/20"
    },
    {
        id: "hopper",
        name: "Hopper",
        role: "CEO / Founder",
        nickname: "The 'Just Get Results' Boss",
        image: "/characters/hopper.png",
        description: "Caffè e contemplazione. Sei burbero, segui l'istinto e a volte infrangi le regole, ma faresti di tutto per salvare l'azienda (e El).",
        superpower: "Tagliare le cazzate e andare al punto",
        weakness: "Non capisci perché ci vogliono 3 settimane per 'un post'",
        mantra: "Mi interessa il fatturato, non le vanity metrics",
        tools: ["Excel (solo quello)", "Email", "Telefono per chiamate dirette", "Niente tool fancy"],
        iconicMoment: "Quando chiedi 'ma questi 10k follower mi portano clienti?' e nessuno sa rispondere",
        compatible: ["Joyce (CMO)", "Lucas (Performance)", "Nancy (Strategist)"],
        teamNeed: "Ti serve una Joyce per tradurre i tuoi 'just do it' in strategie fattibili",
        color: "#003566",
        bgGradient: "from-blue-900/20 to-slate-900/20"
    },
    {
        id: "murray",
        name: "Murray",
        role: "SEO Specialist",
        nickname: "The Algorithm Conspiracy Theorist",
        image: "/characters/murray.png",
        description: "Le dita scorrono veloci sulla tastiera. Sai che l'algoritmo ci ascolta. Bevi vodka, parli russo e ottimizzi il backend dove nessuno osa guardare.",
        superpower: "Prevedere gli update di Google prima che arrivino",
        weakness: "Le tue spiegazioni durano 40 minuti quando basterebbero 5",
        mantra: "Google ci sta nascondendo qualcosa",
        tools: ["Screaming Frog", "Ahrefs", "Search Console h24", "Whiteboard", "Troppe tab aperte"],
        iconicMoment: "Quando l'update che avevi previsto colpisce e tutti vengono da te in panico",
        compatible: ["Eleven (Data)", "Dustin (Growth)", "Nancy (Strategist)"],
        teamNeed: "Ti serve un Mike per rendere le tue scoperte comprensibili ai mortali",
        color: "#06ffa5",
        bgGradient: "from-green-900/20 to-teal-900/20"
    }
];

export const quizQuestions: Question[] = [
    {
        id: 1,
        question: "È lunedì mattina, ore 9:00. Apri il laptop e la prima cosa che fai è...",
        options: [
            {
                text: "Controllo le metriche del weekend con il caffè in mano",
                points: { eleven: 3, lucas: 2, murray: 1 }
            },
            {
                text: "Scorro tutti i commenti e le menzioni sui social",
                points: { mike: 3, max: 1, nancy: 1 }
            },
            {
                text: "Apro 47 tab per 'cercare ispirazione'",
                points: { will: 3, jonathan: 2, dustin: 1 }
            },
            {
                text: "Leggo le email. Tutte. Anche quelle di 3 settimane fa.",
                points: { nancy: 3, joyce: 2, steve: 1 }
            }
        ]
    },
    {
        id: 2,
        question: "Il cliente cambia idea sul brief per la quarta volta. La tua reazione:",
        options: [
            {
                text: "Respiro profondo. Riprendo il documento e aggiungo 'v.5'",
                points: { nancy: 3, steve: 2, joyce: 1 }
            },
            {
                text: "'Interessante! Ma i dati della versione precedente dicevano che...'",
                points: { eleven: 3, lucas: 2, hopper: 1 }
            },
            {
                text: "Aggiorno il calendario. Ancora. Per la quarta volta.",
                points: { mike: 3, joyce: 2, nancy: 1 }
            },
            {
                text: "[Urlo silenzioso interno] 'Certo, nessun problema!' [Smile]",
                points: { will: 3, jonathan: 2, max: 1 }
            }
        ]
    },
    {
        id: 3,
        question: "Quale di queste frasi dici più spesso durante le riunioni?",
        options: [
            {
                text: "'Aspetta, fammi controllare i dati reali prima di decidere'",
                points: { eleven: 3, murray: 2, lucas: 1 }
            },
            {
                text: "'Ok, ma è on-brand? Rispetta le guidelines?'",
                points: { steve: 3, max: 2, nancy: 1 }
            },
            {
                text: "'Ho un'idea: e se invece facessimo così...'",
                points: { dustin: 3, will: 2, mike: 1 }
            },
            {
                text: "'Ragazzi, andiamo al punto. Qual è il risultato che vogliamo?'",
                points: { hopper: 3, lucas: 2, joyce: 1 }
            }
        ]
    },
    {
        id: 4,
        question: "Il tuo tool/software preferito (quello che usi anche nel weekend):",
        options: [
            {
                text: "Google Analytics / Looker Studio / Excel con 2000 formule",
                points: { eleven: 3, lucas: 2, murray: 1 }
            },
            {
                text: "Figma / Canva / Adobe Suite / Lightroom",
                points: { will: 3, jonathan: 2, max: 2 }
            },
            {
                text: "Notion / Airtable / Miro / Google Docs versione enterprise",
                points: { nancy: 3, joyce: 2, steve: 1 }
            },
            {
                text: "Automazioni, API, n8n, Zapier e script Python che ho scritto io",
                points: { dustin: 3, murray: 2, eleven: 1 }
            }
        ]
    },
    {
        id: 5,
        question: "Quando un post/campagna va male, la tua prima reazione è:",
        options: [
            {
                text: "Apro i dati per capire ESATTAMENTE cosa non ha funzionato",
                points: { eleven: 3, lucas: 2, nancy: 1 }
            },
            {
                text: "Era probabilmente l'algoritmo / il timing / la fase lunare",
                points: { murray: 3, mike: 2, dustin: 1 }
            },
            {
                text: "Chiamo subito il team per fare brainstorming su come fixare",
                points: { joyce: 3, steve: 2, nancy: 1 }
            },
            {
                text: "Sapevo che quella creative non funzionava. L'avevo detto.",
                points: { max: 3, hopper: 2, jonathan: 1 }
            }
        ]
    },
    {
        id: 6,
        question: "Come organizzi il tuo lavoro quotidiano?",
        options: [
            {
                text: "Todo list dettagliatissime. Ogni task ha sotto-task. E note. E link.",
                points: { nancy: 3, joyce: 2, steve: 1 }
            },
            {
                text: "Workflow automatizzati. Se ripeto qualcosa 2 volte, lo automatizzo",
                points: { dustin: 3, murray: 2, eleven: 1 }
            },
            {
                text: "Rispondo alle urgenze che arrivano. Il piano lo rivedo domani.",
                points: { mike: 3, will: 2, joyce: 1 }
            },
            {
                text: "Ho un sistema. Funziona. Non chiedetemi di spiegarlo.",
                points: { jonathan: 3, max: 2, hopper: 1 }
            }
        ]
    },
    {
        id: 7,
        question: "Il tuo incubo ricorrente lavorativo:",
        options: [
            {
                text: "Il tracking è rotto e tutti i dati sono sballati da settimane",
                points: { eleven: 3, lucas: 2, murray: 1 }
            },
            {
                text: "Pubblichiamo un post con un typo / logo sbagliato / off-brand",
                points: { steve: 3, mike: 2, nancy: 1 }
            },
            {
                text: "Il cliente chiede 'deliverable' per domattina alle 9",
                points: { will: 3, jonathan: 2, max: 1 }
            },
            {
                text: "Meeting di 3 ore senza agenda dove non si decide nulla",
                points: { hopper: 3, max: 2, dustin: 1 }
            }
        ]
    },
    {
        id: 8,
        question: "Quando presenti un progetto al cliente, tu:",
        options: [
            {
                text: "Mostro i dati. I numeri parlano da soli. No fluff.",
                points: { eleven: 3, lucas: 2, hopper: 1 }
            },
            {
                text: "Racconto una storia. Ogni slide è un pezzo della narrazione.",
                points: { nancy: 3, will: 2, steve: 1 }
            },
            {
                text: "Vado dritto al punto: problema → soluzione → risultati attesi",
                points: { hopper: 3, max: 2, lucas: 1 }
            },
            {
                text: "Faccio vedere visual e mockup. Un'immagine vale più di 1000 slide.",
                points: { jonathan: 3, will: 2, max: 1 }
            }
        ]
    },
    {
        id: 9,
        question: "Il tuo rapporto con i 'trend' del momento:",
        options: [
            {
                text: "Li monitoro costantemente. Devo sapere TUTTO quello che succede.",
                points: { mike: 3, dustin: 2, murray: 1 }
            },
            {
                text: "Analizzo se hanno senso per il nostro brand prima di cavalcarli",
                points: { steve: 3, nancy: 2, max: 1 }
            },
            {
                text: "Mi interessano solo se portano risultati misurabili",
                points: { lucas: 3, eleven: 2, hopper: 1 }
            },
            {
                text: "Preferisco creare contenuti originali che DIVENTANO trend",
                points: { will: 3, jonathan: 2, dustin: 1 }
            }
        ]
    },
    {
        id: 10,
        question: "Qual è il tuo 'guilty pleasure' sul lavoro?",
        options: [
            {
                text: "Sistare quel dashboard fino a che è PERFETTO (anche se nessuno nota)",
                points: { eleven: 3, nancy: 2, steve: 1 }
            },
            {
                text: "Trovare un growth hack che nessuno ha mai provato prima",
                points: { dustin: 3, murray: 2, lucas: 1 }
            },
            {
                text: "Vedere le notifiche salire quando il post inizia a performare",
                points: { mike: 3, lucas: 2, will: 1 }
            },
            {
                text: "Quando il cliente dice 'wow' vedendo il lavoro finale",
                points: { will: 3, jonathan: 2, max: 1 }
            }
        ]
    },
    {
        id: 11,
        question: "Fine giornata, ore 19:00. Stai per chiudere il laptop. Ma...",
        options: [
            {
                text: "'Controllo solo un'ultima volta le metriche...' (sono le 21:30)",
                points: { eleven: 3, lucas: 2, mike: 1 }
            },
            {
                text: "'Ho avuto un'idea!' [riapre Figma/Notion]",
                points: { will: 3, dustin: 2, nancy: 1 }
            },
            {
                text: "Chiudo tutto. Domani è un altro giorno. Work-life balance.",
                points: { max: 3, hopper: 2, jonathan: 1 }
            },
            {
                text: "Sto ancora rispondendo a quella mail delle 17:58",
                points: { joyce: 3, nancy: 2, mike: 1 }
            }
        ]
    },
    {
        id: 12,
        question: "Se dovessi descrivere il tuo approccio al marketing in UNA parola:",
        options: [
            {
                text: "Data-driven / Analitico / Misurabile",
                points: { eleven: 3, lucas: 2, murray: 1 }
            },
            {
                text: "Creativo / Innovativo / Unconventional",
                points: { will: 3, dustin: 2, jonathan: 1 }
            },
            {
                text: "Strategico / Pianificato / Strutturato",
                points: { nancy: 3, steve: 2, joyce: 1 }
            },
            {
                text: "Pratico / Diretto / Results-oriented",
                points: { hopper: 3, max: 2, lucas: 1 }
            }
        ]
    }
];
