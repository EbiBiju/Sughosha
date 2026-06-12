const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const newFooter = `    <footer class="border-t border-white/10 bg-[#0a0a0a] pt-20 pb-8 relative z-20 font-sans">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
                
                <!-- Brand & Description -->
                <div class="lg:col-span-4 lg:pr-8">
                    <a href="index.html" class="flex items-center gap-3 mb-6">
                        <img src="log.png" alt="SughOsha Logo" class="h-8 w-auto" onerror="this.style.display='none'" />
                        <span class="text-2xl font-bold text-white tracking-tight">
                            Sugh<span class="text-[#48b0d6]">Osha</span>
                        </span>
                    </a>
                    <p class="text-gray-400 text-sm leading-relaxed mb-8">
                        Providing world-class corporate training, digital strategy, and creative media production services for modern enterprises ready to evolve and lead their industries. 
                    </p>
                    <div class="flex items-center gap-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition">
                            <i data-lucide="twitter" class="w-4 h-4"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition">
                            <i data-lucide="instagram" class="w-4 h-4"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition">
                            <i data-lucide="linkedin" class="w-4 h-4"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition">
                            <i data-lucide="facebook" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>

                <!-- Company -->
                <div class="lg:col-span-2">
                    <h3 class="text-white font-bold mb-6 text-sm tracking-wide">Company</h3>
                    <ul class="space-y-4">
                        <li><a href="index.html" class="text-gray-400 hover:text-white text-sm transition">Home</a></li>
                        <li><a href="services.html" class="text-gray-400 hover:text-white text-sm transition">Services</a></li>
                        <li><a href="careers.html" class="text-gray-400 hover:text-white text-sm transition">Careers</a></li>
                        <li><a href="about.html" class="text-gray-400 hover:text-white text-sm transition">About Us</a></li>
                        <li><a href="contactus.html" class="text-gray-400 hover:text-white text-sm transition">Contact Help</a></li>
                    </ul>
                </div>

                <!-- Legal -->
                <div class="lg:col-span-2">
                    <h3 class="text-white font-bold mb-6 text-sm tracking-wide">Legal</h3>
                    <ul class="space-y-4">
                        <li><a href="#" class="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white text-sm transition">Terms of Service</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white text-sm transition">Cookie Policy</a></li>
                    </ul>
                </div>

                <!-- Stay Updated -->
                <div class="lg:col-span-4">
                    <h3 class="text-white font-bold mb-6 text-sm tracking-wide">Stay Updated</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-6">
                        Subscribe to our newsletter to receive the latest updates, news, and exclusive offers directly in your inbox.
                    </p>
                    <form class="relative mb-8 max-w-md flex items-center bg-[#111] border border-white/10 p-1 rounded-md">
                        <input type="email" placeholder="Enter your email address" required class="flex-grow bg-transparent border-none px-3 text-white placeholder-gray-500 focus:outline-none text-sm" />
                        <button type="submit" class="flex-shrink-0 bg-gradient-to-r from-[#ea580c] to-red-500 text-white font-semibold px-4 py-2 rounded items-center gap-2 hover:opacity-90 transition hidden sm:flex">
                            Subscribe <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </button>
                         <button type="submit" class="flex-shrink-0 bg-gradient-to-r from-[#ea580c] to-red-500 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 hover:opacity-90 transition sm:hidden">
                            Subscribe
                        </button>
                    </form>

                    <div class="space-y-4">
                        <div class="flex items-center gap-3 text-gray-400">
                            <i data-lucide="map-pin" class="w-5 h-5 flex-shrink-0"></i>
                            <span class="text-sm">Bengaluru, Karnataka, India</span>
                        </div>
                        <div class="flex items-center gap-3 text-gray-400">
                            <i data-lucide="mail" class="w-5 h-5 flex-shrink-0"></i>
                            <a href="mailto:contact@shughosha.com" class="text-sm hover:text-white transition">contact@shughosha.com</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Banner -->
            <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500">
                <p>
                    &copy; 2026 SughOsha Enterprises. All rights reserved.
                </p>
                <div class="flex items-center gap-1.5">
                    <span>Designed with </span>
                    <span class="text-red-500">❤</span>
                    <span> by SughOsha</span>
                </div>
            </div>
        </div>
    </footer>`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            const footerRegex = /<footer[\s\S]*?<\/footer>/i;
            if (footerRegex.test(content)) {
                content = content.replace(footerRegex, newFooter);
            } else {
                content = content.replace(/<\/body>/i, newFooter + '\n</body>');
            }

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

console.log("Applied the EXACT visual design from the user's screenshot.");
