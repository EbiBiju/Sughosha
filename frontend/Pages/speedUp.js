const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    // 1. Process index.html (and any other files with .book-inner)
    const indexHtmlPath = path.join(dir, 'index.html');
    if (fs.existsSync(indexHtmlPath)) {
        let content = fs.readFileSync(indexHtmlPath, 'utf8');
        content = content.replace(
            /transition:\s*transform\s*1\.8s\s*cubic-bezier\(0\.25,\s*1,\s*0\.5,\s*1\);/g,
            'transition: transform 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);'
        );
        fs.writeFileSync(indexHtmlPath, content, 'utf8');
    }

    // 2. Process careers.html
    const carrersHtmlPath = path.join(dir, 'careers.html');
    if (fs.existsSync(carrersHtmlPath)) {
        let content = fs.readFileSync(carrersHtmlPath, 'utf8');

        // Hover
        content = content.replace(
            /(.glass-card\s*{[^}]*)transition:\s*all\s*1\.0s\s*cubic-bezier\(0\.25,\s*1,\s*0\.5,\s*1\);\s*\/\*\s*Smooth air hover\s*\*\//g,
            '$1transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);'
        );

        // Travel
        content = content.replace(
            /transition:\s*all\s*1\.4s\s*cubic-bezier\(0\.25,\s*1,\s*0\.5,\s*1\);\s*\/\*\s*Smooth air travel\s*\*\//g,
            'transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);'
        );

        // Flip Internal career page
        content = content.replace(
            /transition:\s*transform\s*1\.8s\s*cubic-bezier\(0\.25,\s*1,\s*0\.5,\s*1\);/g,
            'transition: transform 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);'
        );

        // JS open
        content = content.replace(
            /setTimeout\(\(\)\s*=>\s*{\s*flipCard\.classList\.add\('flipped'\);\s*},\s*1450\);/g,
            "setTimeout(() => { flipCard.classList.add('flipped'); }, 850);"
        );

        // JS close
        content = content.replace(
            /setTimeout\(\(\)\s*=>\s*{[\s\S]*?modalCardContainer\.classList\.add\('opacity-0',\s*'pointer-events-none'\);[\s\S]*?},\s*1400\);/g,
            (match) => {
                return match.replace(/1400\);$/, "800);");
            }
        );

        fs.writeFileSync(carrersHtmlPath, content, 'utf8');
        console.log('Sped up animations in', carrersHtmlPath);
    }
}
