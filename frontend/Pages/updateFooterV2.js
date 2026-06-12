const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const newFooter = `    <footer class="relative border-t border-white/5 bg-black/90 backdrop-blur-xl pt-24 pb-12 overflow-hidden z-20">
        <!-- Background Glows -->
        <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#48b0d6] rounded-full filter blur-[150px] opacity-[0.06] pointer-events-none"></div>
        <div class="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#ea580c] rounded-full filter blur-[150px] opacity-[0.04] pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                
                <!-- Brand & Socials -->
                <div class="lg:col-span-4">
                    <a href="index.html" class="flex items-center gap-3 mb-6 inline-block">
                        <span class="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                            <img src="log.png" alt="SughOsha Logo" class="h-10 w-auto" onerror="this.style.display='none'" />
                            Sugh<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#48b0d6] to-cyan-300">Osha</span>
                        </span>
                    </a>
                    <p class="text-gray-400 text-sm leading-relaxed mb-8 pr-4">
                        Providing world-class corporate training, digital strategy, and creative media production services for modern enterprises ready to evolve and lead their industries. 
                    </p>
                    <div class="flex items-center gap-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#48b0d6] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_15px_rgba(72,176,214,0.4)]">
                            <i data-lucide="twitter" class="w-4 h-4"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#48b0d6] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_15px_rgba(72,176,214,0.4)]">
                            <i data-lucide="instagram" class="w-4 h-4"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#48b0d6] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_15px_rgba(72,176,214,0.4)]">
                            <i data-lucide="linkedin" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="lg:col-span-2">
                    <h3 class="text-white font-bold mb-6 tracking-wide">Company</h3>
                    <ul class="space-y-4">
                        <li><a href="index.html" class="text-gray-400 hover:text-[#48b0d6] text-sm transition font-medium flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-[#48b0d6] opacity-0 group-hover:opacity-100 transition-opacity"></span>Home</a></li>
                        <li><a href="services.html" class="text-gray-400 hover:text-[#48b0d6] text-sm transition font-medium flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-[#48b0d6] opacity-0 group-hover:opacity-100 transition-opacity"></span>Services</a></li>
                        <li><a href="careers.html" class="text-gray-400 hover:text-[#48b0d6] text-sm transition font-medium flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-[#48b0d6] opacity-0 group-hover:opacity-100 transition-opacity"></span>Careers</a></li>
                        <li><a href="about.html" class="text-gray-400 hover:text-[#48b0d6] text-sm transition font-medium flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-[#48b0d6] opacity-0 group-hover:opacity-100 transition-opacity"></span>About Us</a></li>
                    </ul>
                </div>

                <div class="lg:col-span-2">
                    <h3 class="text-white font-bold mb-6 tracking-wide">Legal</h3>
                    <ul class="space-y-4">
                        <li><a href="#" class="text-gray-400 hover:text-[#48b0d6] text-sm transition font-medium flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-[#48b0d6] opacity-0 group-hover:opacity-100 transition-opacity"></span>Privacy Policy</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-[#48b0d6] text-sm transition font-medium flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-[#48b0d6] opacity-0 group-hover:opacity-100 transition-opacity"></span>Terms of Service</a></li>
                        <li><a href="contactus.html" class="text-gray-400 hover:text-[#48b0d6] text-sm transition font-medium flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-[#48b0d6] opacity-0 group-hover:opacity-100 transition-opacity"></span>Contact Help</a></li>
                    </ul>
                </div>

                <!-- Contact & Location -->
                <div class="lg:col-span-4">
                    <h3 class="text-white font-bold mb-6 tracking-wide">Get in Touch</h3>
                    <div class="space-y-4">
                        <div class="flex items-start gap-3 text-sm text-gray-400 group">
                            <i data-lucide="map-pin" class="w-5 h-5 text-gray-500 mt-0.5 group-hover:text-[#48b0d6] transition-colors flex-shrink-0"></i>
                            <span>Bengaluru, Karnataka, India</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm text-gray-400 group">
                            <i data-lucide="mail" class="w-4 h-4 text-gray-500 group-hover:text-[#48b0d6] transition-colors flex-shrink-0"></i>
                            <a href="mailto:contact@shughosha.com" class="hover:text-white transition">contact@shughosha.com</a>
                        </div>
                    </div>
                    
                    <div class="mt-8">
                        <p class="text-gray-400 text-sm mb-4">Newsletter</p>
                        <form class="relative max-w-sm">
                            <input type="email" placeholder="Enter your email" required class="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#48b0d6] transition pr-32" />
                            <button type="submit" class="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full text-sm font-bold bg-[#48b0d6] text-white hover:bg-[#3a9cbd] transition-all shadow-[0_0_15px_rgba(72,176,214,0.3)] hover:scale-105">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Bottom Banner -->
            <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-500 text-sm">
                    &copy; 2025 SughOsha Enterprises. All rights reserved.
                </p>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                    <span>Designed with</span>
                    <span class="text-red-500 animate-pulse">❤</span>
                    <span>by SughOsha</span>
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

console.log("Done upgrading to Premium Footer.");
