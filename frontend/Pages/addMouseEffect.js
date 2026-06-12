const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const cursorInjection = `
    <!-- NEW: React-style Magnetic Mouse Trailer -->
    <style>
        .cursor-blob {
            position: fixed;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(72,176,214,0.8) 0%, rgba(72,176,214,0) 70%);
            pointer-events: none;
            z-index: 99999;
            mix-blend-mode: screen;
            transition: width 0.3s ease-out, height 0.3s ease-out, background 0.3s ease-out;
            transform: translate(-50%, -50%);
            will-change: left, top, width, height;
        }

        .cursor-blob.hover-active {
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(234,88,12,0.6) 0%, rgba(234,88,12,0) 70%);
        }
    </style>

    <div class="cursor-blob" id="cursor-blob"></div>

    <script>
        const cursorBlob = document.getElementById('cursor-blob');
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let blobX = mouseX;
        let blobY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // 60FPS fluid physics loop for the trailing effect 
        function animateBlob() {
            blobX += (mouseX - blobX) * 0.15;
            blobY += (mouseY - blobY) * 0.15;
            cursorBlob.style.left = \`\${blobX}px\`;
            cursorBlob.style.top = \`\${blobY}px\`;
            requestAnimationFrame(animateBlob);
        }
        animateBlob();

        // Attach magnetic logic to all hoverable items
        function attachMagneticHover() {
            const interactables = document.querySelectorAll('a, button, .job-card, .book-container, input');
            interactables.forEach(el => {
                // To avoid multiple listeners if called again
                el.removeEventListener('mouseenter', handleEnter);
                el.removeEventListener('mouseleave', handleLeave);
                
                el.addEventListener('mouseenter', handleEnter);
                el.addEventListener('mouseleave', handleLeave);
            });
        }

        function handleEnter() { cursorBlob.classList.add('hover-active'); }
        function handleLeave() { cursorBlob.classList.remove('hover-active'); }

        setTimeout(attachMagneticHover, 500); // give time for dynamic DOM elements if any
    </script>
`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            if (!content.includes('cursor-blob')) {
                // inject before </body>
                content = content.replace(/<\/body>/i, cursorInjection + '\n</body>');
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Added magnetic mouse to ' + file);
            }
        }
    }
}
