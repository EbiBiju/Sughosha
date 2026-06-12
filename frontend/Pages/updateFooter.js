const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const newFooter = `    <footer class="border-t border-white/5 bg-black/90 backdrop-blur-xl pt-20 pb-10 relative z-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-10 mb-10">
                <div class="flex items-center gap-3">
                    <img src="log.png" onerror="this.style.display='none'" alt="ShuGhosha Logo" class="h-12 w-auto" />
                    <span class="text-3xl font-bold text-white tracking-tight">
                        Sugh<span class="text-[#48b0d6]">Osha</span>
                    </span>
                </div>
                <div class="flex gap-10 text-base font-medium text-gray-400">
                    <a href="index.html" class="hover:text-accent transition hover:scale-105">Home</a>
                    <a href="services.html" class="hover:text-accent transition hover:scale-105">Services</a>
                    <a href="careers.html" class="hover:text-accent transition hover:scale-105">Careers</a>
                    <a href="contactus.html" class="hover:text-accent transition hover:scale-105">Contact</a>
                </div>
            </div>
            <div class="border-t border-white/10 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; 2025 SughOsha Enterprises. All rights reserved.</p>
                <div class="flex gap-6 mt-4 md:mt-0">
                    <a href="#" class="hover:text-gray-300">Privacy</a>
                    <a href="#" class="hover:text-gray-300">Terms</a>
                </div>
            </div>
        </div>
    </footer>`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    
    // Rename Home.html to index.html if it exists
    if (files.includes('Home.html')) {
        fs.renameSync(path.join(dir, 'Home.html'), path.join(dir, 'index.html'));
    }

    // Refresh file list
    const updatedFiles = fs.readdirSync(dir);

    for (const file of updatedFiles) {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // 1. Replace all Home.html / home.html with index.html
            content = content.replace(/Home\.html/gi, 'index.html');

            // 2. Replace existing footer or insert if missing
            const footerRegex = /<footer[\s\S]*?<\/footer>/i;
            if (footerRegex.test(content)) {
                content = content.replace(footerRegex, newFooter);
            } else {
                // If it doesn't have a footer, insert before </body>
                content = content.replace(/<\/body>/i, newFooter + '\n</body>');
            }

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

console.log("Done updating files.");
