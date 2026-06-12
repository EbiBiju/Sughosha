const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const properStyle = `<style>
    /* --- CORE PAGE SETUP --- */
    :root {
        --accent-cyan: #48b0d6;
        --accent-purple: #8b5cf6;
    }
    body {
        font-family: 'Plus Jakarta Sans', sans-serif;
        background-color: #000000;
        overflow-x: hidden;
    }
    
    .glass-card-container { position: relative; }
    
    .glass-card {
        background: rgba(20, 25, 40, 0.7);
        backdrop-filter: blur(25px) saturate(150%);
        -webkit-backdrop-filter: blur(25px) saturate(150%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transform: translateY(40px) scale(0.96);
        transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .card-enter-active { opacity: 1 !important; transform: translateY(0) scale(1) !important; }

    .glass-input {
        background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease;
    }
    .glass-input:focus {
        background: rgba(0, 0, 0, 0.5); border-color: var(--accent-cyan); box-shadow: 0 0 0 2px rgba(72, 176, 214, 0.2);
    }
    .glass-input::placeholder { color: rgba(255, 255, 255, 0.4); }
    .custom-checkbox:checked { background-color: var(--accent-cyan); border-color: var(--accent-cyan); }
</style>
`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const filePath = path.join(dir, 'login.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix the broken style tag
        content = content.replace(/<style>\s*<!-- Premium Font:/, properStyle + '\n    <!-- Premium Font:');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed broken CSS block in', filePath);
    }
}
