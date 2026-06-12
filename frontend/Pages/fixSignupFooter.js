const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const filePath = path.join(dir, 'signup.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Strip the problematic inline flex layout from the <body> tag
        content = content.replace(/<body[^>]*>/i, '<body class="text-white font-sans overflow-x-hidden relative">');

        // 2. We need to wrap the #signup-card in a proper <main> that mimics login.html
        // Check if we haven't already wrapped it in a <main>
        if (!content.includes('<main class="main-container">')) {
            // First, find the signup-card div
            const cardRegex = /<div id="signup-card" class="glass-card(.|\n)*?<\/script>\s*(?=<footer)/i;
            const match = content.match(cardRegex);
            
            if (match) {
                // The match includes the signup card and the scripts before the footer
                // Let's just wrap the card in <main>
                // We will add the .main-container CSS to the <style> block, or just use Tailwind on the <main>
                const replacement = `
    <!-- MAIN CONTAINER forces the screen to fill, pushing footer down below the fold -->
    <main class="min-h-screen flex w-full justify-center items-center py-20 px-4 relative z-30">
        ${match[0]}
    </main>
`;
                content = content.replace(cardRegex, replacement.trim() + '\n\n');
            }
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed body/main framing on', filePath, 'forcing footer to the bottom.');
    }
}
