// ============================================================
// SughOsha Auth Guard & Dynamic Navigation
// Included in the <head> of all pages
// ============================================================

(function() {
    // 1. Determine current page
    let path = window.location.pathname;
    let page = path.split('/').pop();
    
    // Default to index.html if on root directory
    if (!page || page === '') {
        page = 'index.html';
    }

    // 2. Define Public Pages
    // Only these pages can be accessed without logging in.
    const publicPages = ['index.html', 'services.html', 'login.html', 'signup.html'];

    // 3. Check Authentication State
    const token = localStorage.getItem('shughosha_token');
    const userStr = localStorage.getItem('shughosha_user');

    // 4. Route Protection Logic
    if (!token && !publicPages.includes(page)) {
        // User is not logged in and trying to access a protected page
        console.warn(`[AuthGuard] Access denied to ${page}. Redirecting to login.`);
        window.location.replace('login.html');
        return; // Stop execution
    }

    // 5. Dynamic Navigation UI Update
    document.addEventListener('DOMContentLoaded', () => {
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                
                // --- Desktop Navigation Update ---
                // Find the desktop container that holds the Login link
                const desktopLinks = Array.from(document.querySelectorAll('a[href="login.html"]'));
                const desktopLoginLink = desktopLinks.find(a => !a.closest('#mobile-menu'));
                
                if (desktopLoginLink && desktopLoginLink.parentElement) {
                    const authContainer = desktopLoginLink.parentElement;
                    authContainer.innerHTML = `
                        <div class="relative group cursor-pointer flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-[#48b0d6]/20 flex items-center justify-center border border-[#48b0d6]/50 shadow-[0_0_15px_rgba(72,176,214,0.3)]">
                                <i data-lucide="user" class="w-5 h-5 text-[#48b0d6]"></i>
                            </div>
                            <span class="text-white font-medium text-[15px]">${user.name}</span>
                            
                            <!-- Dropdown Menu -->
                            <div class="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 pb-2 z-[99999]">
                                <button onclick="logout()" class="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/5 transition flex items-center gap-3">
                                    <i data-lucide="log-out" class="w-4 h-4"></i> 
                                    <span class="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                        <a href="contactus.html" class="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-full font-bold text-[15px] shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 transform hover:scale-105">Get Started</a>
                    `;
                }

                // --- Mobile Navigation Update ---
                // Find the mobile container that holds the Login link
                const mobileLoginLink = Array.from(document.querySelectorAll('#mobile-menu a[href="login.html"]'))[0];
                
                if (mobileLoginLink && mobileLoginLink.parentElement) {
                    const mobileAuthContainer = mobileLoginLink.parentElement;
                    mobileAuthContainer.innerHTML = `
                        <div class="flex items-center justify-between px-3 py-2 bg-white/5 rounded-lg mb-2 border border-white/10">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-[#48b0d6]/20 flex items-center justify-center border border-[#48b0d6]/50">
                                    <i data-lucide="user" class="w-4 h-4 text-[#48b0d6]"></i>
                                </div>
                                <span class="text-white font-medium text-[15px]">${user.name}</span>
                            </div>
                            <button onclick="logout()" class="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-white/5 transition flex items-center justify-center" title="Logout">
                                <i data-lucide="log-out" class="w-4 h-4"></i>
                            </button>
                        </div>
                        <a href="contactus.html" class="block text-center bg-[#48b0d6] text-white py-2 rounded-full font-semibold text-[15px]">Get Started</a>
                    `;
                }

                // Re-initialize Lucide icons since we injected new HTML
                if (typeof lucide !== 'undefined' && lucide.createIcons) {
                    lucide.createIcons();
                }

            } catch (e) {
                console.error('[AuthGuard] Error parsing user data. Forcing logout.', e);
                logout();
            }
        }
    });

    // 6. Global Logout Function
    window.logout = function() {
        localStorage.removeItem('shughosha_token');
        localStorage.removeItem('shughosha_user');
        
        // We use localStorage to pass the flag because URL query parameters 
        // can break local file:/// testing in browsers.
        localStorage.setItem('shughosha_logout', 'true');
        window.location.href = 'index.html';
    };

})();
