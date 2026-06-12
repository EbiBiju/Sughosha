const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const newCSS = `
        /* --- Water Dance Animation Sequence --- */
        .dance-container {
            position: fixed;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 100vw; height: 100vh;
            pointer-events: none;
            z-index: 10;
        }

        .orb {
            position: absolute;
            top: 50%; left: 50%;
            width: 30px; height: 30px;
            margin-top: -15px; margin-left: -15px;
            border-radius: 50%;
            box-shadow: 0 0 25px currentColor, inset 0 0 10px white; 
            opacity: 0; /* invisible until triggered */
            mix-blend-mode: screen;
            will-change: transform, opacity;
        }
        .orb-cyan { background: white; color: var(--accent-cyan); }
        .orb-purple { background: white; color: var(--accent-purple); }

        /* The calculated trajectory for the 3.6s dance */
        @keyframes dance-orb-1 {
            0% { transform: rotate(0deg) translateX(80px) scale(1); opacity: 1; }
            33.33% { transform: rotate(360deg) translateX(80px) scale(1); opacity: 1; }
            55.55% { transform: rotate(720deg) translateX(55px) scale(1); opacity: 1; }
            88.88% { transform: rotate(1080deg) translateX(55px) scale(1); opacity: 1; }
            100% { transform: rotate(1260deg) translateX(0px) scale(0.1); opacity: 0; }
        }
        @keyframes dance-orb-2 {
            0% { transform: rotate(180deg) translateX(80px) scale(1); opacity: 1; }
            33.33% { transform: rotate(540deg) translateX(80px) scale(1); opacity: 1; }
            55.55% { transform: rotate(840deg) translateX(55px) scale(1.4); opacity: 1; }
            88.88% { transform: rotate(1200deg) translateX(55px) scale(1.4); opacity: 1; }
            100% { transform: rotate(1380deg) translateX(0px) scale(0.1); opacity: 0; }
        }
        @keyframes dance-orb-3 {
            0% { transform: rotate(90deg) translateX(80px) scale(1); opacity: 1; }
            33.33% { transform: rotate(450deg) translateX(80px) scale(1); opacity: 1; }
            55.55% { transform: rotate(960deg) translateX(55px) scale(1); opacity: 0; } /* Seamlessly merges */
            100% { transform: rotate(960deg) translateX(55px) scale(1); opacity: 0; }
        }
        @keyframes dance-orb-4 {
            0% { transform: rotate(270deg) translateX(80px) scale(1); opacity: 1; }
            33.33% { transform: rotate(630deg) translateX(80px) scale(1); opacity: 1; }
            55.55% { transform: rotate(960deg) translateX(55px) scale(1.4); opacity: 1; } /* Consumes orb 3 */
            88.88% { transform: rotate(1320deg) translateX(55px) scale(1.4); opacity: 1; }
            100% { transform: rotate(1500deg) translateX(0px) scale(0.1); opacity: 0; }
        }

        .orb.dance-1 { animation: dance-orb-1 3.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .orb.dance-2 { animation: dance-orb-2 3.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .orb.dance-3 { animation: dance-orb-3 3.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .orb.dance-4 { animation: dance-orb-4 3.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        /* The Zero-Lag Water Ripple Resonance */
        .resonance-ripple {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 30px; height: 30px;
            margin-top: -15px; margin-left: -15px;
            border: 5px solid var(--accent-cyan);
            border-radius: 50%;
            opacity: 0;
            box-shadow: 0 0 60px var(--accent-cyan), inset 0 0 60px var(--accent-purple);
            will-change: transform, opacity, border-width;
        }

        @keyframes ripple-blast-out {
            0% { transform: scale(0); opacity: 1; border-width: 15px; }
            40% { opacity: 0.9; border-width: 4px; }
            100% { transform: scale(130); opacity: 0; border-width: 1px; } 
        }

        .resonance-ripple.blast {
            animation: ripple-blast-out 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        /* Ambient Post-Blast Lighting */
        .aurora-light {
            position: fixed;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0;
            mix-blend-mode: screen;
            z-index: -1;
            transition: opacity 2.0s ease-in-out;
        }
        .aurora-light.finished { opacity: 0.5; }

        .light-1-final { bottom: -20%; left: -20%; width: 90vmax; height: 90vmax; background: radial-gradient(circle, var(--accent-cyan), transparent 60%); }
        .light-2-final { top: -20%; right: -20%; width: 90vmax; height: 90vmax; background: radial-gradient(circle, var(--accent-purple), transparent 60%); }
`;

const newDOM = `
    <div class="dance-container">
        <!-- The Four Dancing Orbs -->
        <div id="orb-1" class="orb orb-cyan"></div>
        <div id="orb-2" class="orb orb-cyan"></div>
        <div id="orb-3" class="orb orb-purple"></div>
        <div id="orb-4" class="orb orb-purple"></div>
        
        <!-- The High-Speed Resonance Ripple -->
        <div id="resonance-ripple" class="resonance-ripple"></div>
    </div>

    <!-- Background Lighting -->
    <div id="final-light-1" class="aurora-light light-1-final"></div>
    <div id="final-light-2" class="aurora-light light-2-final"></div>
`;

const jsBody = `
            // 1. Start the 3.6s choreographed Water Dance
            setTimeout(() => {
                document.getElementById('orb-1').classList.add('dance-1');
                document.getElementById('orb-2').classList.add('dance-2');
                document.getElementById('orb-3').classList.add('dance-3');
                document.getElementById('orb-4').classList.add('dance-4');
            }, 100);

            // 2. Exactly at 3.6s (3700ms), blast the water ripple shockwave as they collapse
            setTimeout(() => {
                document.getElementById('resonance-ripple').classList.add('blast');
                document.getElementById('final-light-1').classList.add('finished');
                document.getElementById('final-light-2').classList.add('finished');
            }, 3700);

            // 3. Complete at exactly 4.0s (4000ms), drop the Login Card in
            setTimeout(() => {
                document.getElementById('login-card').classList.add('card-enter-active');
                document.getElementById('card-container').classList.add('card-loaded');
            }, 4000);

            // Re-enable scrolling safely after
            setTimeout(() => {
                document.body.classList.add('scroll-active');
            }, 4600);
`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const filePath = path.join(dir, 'login.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace CSS section
        const cssStart = content.indexOf('/* --- Phase 1: The Traveling Balls --- */');
        const cssEnd = content.indexOf('/* =========================================', cssStart);
        if (cssStart !== -1 && cssEnd !== -1) {
            content = content.substring(0, cssStart) + newCSS + '\n        ' + content.substring(cssEnd);
        }

        // Replace DOM section
        const domStart = content.indexOf('<div class="aurora-background">');
        let domEnd = content.indexOf('<div class="aurora-light light-3-final"');
        if (domEnd === -1) {
            domEnd = content.indexOf('</div>', content.indexOf('<div id="final-light-2"')) + 6;
        } else {
            domEnd = content.indexOf('</div>', domEnd) + 6;
            domEnd = content.indexOf('</div>', domEnd) + 6; // To close aurora bag
        }
        // Actually best is to just regex match the block
        content = content.replace(/<div class="aurora-background">[\s\S]*?<\/div>\s*<\/div>/, newDOM);
        // Sometimes aurora-bg is only one div deep. Let's do a reliable replacement:
        content = content.replace(/<div class="aurora-background">[\s\S]*?<main class="main-container">/, newDOM + '\n\n    <main class="main-container">');


        // Replace JS logic inside document.addEventListener('DOMContentLoaded', () => { ... })
        content = content.replace(
            /setTimeout\(\(\)\s*=>\s*{[\s\S]*?classList\.add\('animate'\);[\s\S]*?},\s*200\);[\s\S]*?setTimeout\(\(\)\s*=>\s*{[\s\S]*?classList\.add\('card-loaded'\);\s*},\s*1300\);[\s\S]*?setTimeout\(\(\)\s*=>\s*{[\s\S]*?classList\.add\('scroll-active'\);\s*},\s*2000\);/g,
            jsBody.trim()
        );

        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Water ripple sequence injected into', filePath);
    }
}
