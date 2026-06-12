const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const newCSS = `
        /* --- Phase 1: The Traveling Balls --- */
        .intro-ball {
            position: absolute;
            top: 50%; left: 50%;
            width: 40px; height: 40px;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 40px currentColor, inset 0 0 20px white; 
            opacity: 1;
            z-index: 10;
            mix-blend-mode: screen;
            /* CRITICAL PERF FIX: Do not explicitly mention 'filter' in will-change if we don't animate it */
            will-change: transform, opacity;
            /* Filter is static now to avoid repaint lag during animation */
            filter: blur(2px) brightness(1.2);
        }
        .ball-cyan { background: white; color: var(--accent-cyan); }
        .ball-purple { background: white; color: var(--accent-purple); }
        .ball-orange { background: white; color: #ea580c; } /* Firey orange */

        /* Smooth Air Animations - Low GPU Cost */
        @keyframes travel-blast-cyan {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            60% { transform: translate(-35vw, 30vh) scale(3); opacity: 0.8; }
            100% { transform: translate(-45vw, 40vh) scale(8); opacity: 0; }
        }
        @keyframes travel-blast-purple {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            60% { transform: translate(35vw, -30vh) scale(3); opacity: 0.8; }
            100% { transform: translate(45vw, -40vh) scale(8); opacity: 0; }
        }
        @keyframes travel-blast-orange {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            60% { transform: translate(0vw, -30vh) scale(4); opacity: 0.8; }
            100% { transform: translate(0vw, -45vh) scale(10); opacity: 0; } 
        }

        .ball-cyan.animate { animation: travel-blast-cyan 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .ball-purple.animate { animation: travel-blast-purple 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .ball-orange.animate { animation: travel-blast-orange 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        /* --- Phase 2: The Final Aurora Lights --- */
        .aurora-light {
            position: absolute;
            border-radius: 50%;
            /* Fixed heavy blur issue causing gpu spikes. We use an opacity fade which is hardware accelerated */
            filter: blur(80px);
            opacity: 0;
            mix-blend-mode: screen;
            will-change: opacity;
            transition: opacity 1.8s ease-in-out;
        }
        .aurora-light.finished { opacity: 0.5; }

        .light-1-final { bottom: -20%; left: -20%; width: 90vmax; height: 90vmax; background: radial-gradient(circle, var(--accent-cyan), transparent 60%); }
        .light-2-final { top: -20%; right: -20%; width: 90vmax; height: 90vmax; background: radial-gradient(circle, var(--accent-purple), transparent 60%); }
        .light-3-final { top: -40%; left: 10%; width: 100vmax; height: 100vmax; background: radial-gradient(circle, rgba(234, 88, 12, 0.3), transparent 50%); }
`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const loginHtmlPath = path.join(dir, 'login.html');
    if (fs.existsSync(loginHtmlPath)) {
        let content = fs.readFileSync(loginHtmlPath, 'utf8');

        // Replace CSS section safely
        const cssStart = content.indexOf('/* --- Phase 1: The Traveling Balls --- */');
        const cssEnd = content.indexOf('/* =========================================', cssStart);
        if (cssStart !== -1 && cssEnd !== -1) {
            content = content.substring(0, cssStart) + newCSS + '\n        ' + content.substring(cssEnd);
            fs.writeFileSync(loginHtmlPath, content, 'utf8');
            console.log('Fixed lag on login.html in', loginHtmlPath);
        }
    }
}
