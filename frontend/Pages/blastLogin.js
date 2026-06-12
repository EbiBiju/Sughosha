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
            box-shadow: 0 0 40px currentColor, 0 0 80px currentColor, inset 0 0 20px white; 
            opacity: 1;
            z-index: 10;
            mix-blend-mode: screen;
            will-change: transform, opacity, filter;
            filter: brightness(1.5);
        }
        .ball-cyan { background: white; color: var(--accent-cyan); }
        .ball-purple { background: white; color: var(--accent-purple); }
        .ball-orange { background: white; color: #ea580c; } /* Firey orange */

        @keyframes travel-blast-cyan {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            60% { transform: translate(-35vw, 30vh) scale(1.5); opacity: 1; filter: brightness(2); }
            100% { transform: translate(-45vw, 40vh) scale(150); opacity: 0; filter: brightness(5) blur(10px); }
        }
        @keyframes travel-blast-purple {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            60% { transform: translate(35vw, -30vh) scale(1.5); opacity: 1; filter: brightness(2); }
            100% { transform: translate(45vw, -40vh) scale(150); opacity: 0; filter: brightness(5) blur(10px); }
        }
        @keyframes travel-blast-orange {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            60% { transform: translate(0vw, -40vh) scale(2); opacity: 1; filter: brightness(2); }
            100% { transform: translate(0vw, -50vh) scale(200); opacity: 0; filter: brightness(10) blur(20px); } /* Massive fire blast */
        }

        .ball-cyan.animate { animation: travel-blast-cyan 1.6s cubic-bezier(0.5, 0, 0.1, 1) forwards; }
        .ball-purple.animate { animation: travel-blast-purple 1.6s cubic-bezier(0.5, 0, 0.1, 1) forwards; }
        .ball-orange.animate { animation: travel-blast-orange 1.6s cubic-bezier(0.5, 0, 0.1, 1) forwards; }

        /* --- Phase 2: The Final Aurora Lights --- */
        .aurora-light {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0;
            mix-blend-mode: screen;
            transition: opacity 1.2s ease-in;
        }
        .aurora-light.finished { opacity: 0.6; }

        .light-1-final { bottom: -20%; left: -20%; width: 90vmax; height: 90vmax; background: radial-gradient(circle, var(--accent-cyan), transparent 60%); }
        .light-2-final { top: -20%; right: -20%; width: 90vmax; height: 90vmax; background: radial-gradient(circle, var(--accent-purple), transparent 60%); }
        .light-3-final { top: -40%; left: 10%; width: 100vmax; height: 100vmax; background: radial-gradient(circle, rgba(234, 88, 12, 0.4), transparent 50%); }
`;

const newDOM = `
    <div class="aurora-background">
        <div id="ball-1" class="intro-ball ball-cyan"></div>
        <div id="ball-2" class="intro-ball ball-purple"></div>
        <div id="ball-3" class="intro-ball ball-orange"></div>

        <div id="final-light-1" class="aurora-light light-1-final"></div>
        <div id="final-light-2" class="aurora-light light-2-final"></div>
        <div id="final-light-3" class="aurora-light light-3-final"></div>
    </div>
`;

const jsPart1 = `
            setTimeout(() => {
                document.getElementById('ball-1').classList.add('animate');
                document.getElementById('ball-2').classList.add('animate');
                document.getElementById('ball-3').classList.add('animate');
            }, 200);
`;

const jsPart2 = `
            setTimeout(() => {
                document.getElementById('final-light-1').classList.add('finished');
                document.getElementById('final-light-2').classList.add('finished');
                document.getElementById('final-light-3').classList.add('finished');
                document.getElementById('login-card').classList.add('card-enter-active');
                document.getElementById('card-container').classList.add('card-loaded');
            }, 1300);
`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const loginHtmlPath = path.join(dir, 'login.html');
    if (fs.existsSync(loginHtmlPath)) {
        let content = fs.readFileSync(loginHtmlPath, 'utf8');

        // Replace CSS section
        const cssStart = content.indexOf('/* --- Phase 1: The Traveling Balls --- */');
        const cssEnd = content.indexOf('/* =========================================', cssStart);
        if (cssStart !== -1 && cssEnd !== -1) {
            content = content.substring(0, cssStart) + newCSS + '\n        ' + content.substring(cssEnd);
        }

        // Replace DOM section
        const domStart = content.indexOf('<div class="aurora-background">');
        const domEnd = content.indexOf('</div>', content.indexOf('<div id="final-light-2"')) + 6;
        if (domStart !== -1 && domEnd !== -1) {
             content = content.substring(0, domStart) + newDOM.trim() + content.substring(domEnd);
        }

        // Replace JS Part 1
        content = content.replace(
            /setTimeout\(\(\)\s*=>\s*{\s*document.getElementById\('ball-1'\).classList.add\('animate'\);\s*document.getElementById\('ball-2'\).classList.add\('animate'\);\s*},\s*200\);/g,
            jsPart1.trim()
        );

        // Replace JS Part 2
        content = content.replace(
            /setTimeout\(\(\)\s*=>\s*{\s*document.getElementById\('final-light-1'\).classList.add\('finished'\);\s*document.getElementById\('final-light-2'\).classList.add\('finished'\);\s*document.getElementById\('login-card'\).classList.add\('card-enter-active'\);\s*document.getElementById\('card-container'\).classList.add\('card-loaded'\);\s*},\s*1300\);/g,
            jsPart2.trim()
        );

        fs.writeFileSync(loginHtmlPath, content, 'utf8');
        console.log('Updated login.html blast effect in', loginHtmlPath);
    }
}
