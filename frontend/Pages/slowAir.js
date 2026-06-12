const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

for (const dir of dirs) {
    const carrersPath = path.join(dir, 'careers.html');
    if (fs.existsSync(carrersPath)) {
        let content = fs.readFileSync(carrersPath, 'utf8');

        // 1. Slow down the hover state of the job cards
        content = content.replace(
            /(.glass-card\s*{[^}]*)transition:\s*all\s*0\.3s\s*ease;/g,
            '$1transition: all 1.0s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth air hover */'
        );

        // 2. Slow down the modal container travel time
        content = content.replace(
            /transition:\s*all\s*0\.6s\s*cubic-bezier\(0\.25,\s*0\.46,\s*0\.45,\s*0\.94\);/g,
            'transition: all 1.4s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth air travel */'
        );

        // 3. Update the Javascript setTimeout for the forward flip
        content = content.replace(
            /setTimeout\(\(\)\s*=>\s*{\s*flipCard\.classList\.add\('flipped'\);\s*},\s*650\);/g,
            "setTimeout(() => { flipCard.classList.add('flipped'); }, 1450);"
        );

        // 4. Update the Javascript setTimeout for hiding the modal completely on close
        content = content.replace(
            /setTimeout\(\(\)\s*=>\s*{[\s\S]*?modalCardContainer\.classList\.add\('opacity-0',\s*'pointer-events-none'\);[\s\S]*?},\s*600\);/g,
            (match) => {
                return match.replace(/600\);$/, "1400);");
            }
        );

        fs.writeFileSync(carrersPath, content, 'utf8');
        console.log('Updated air flow animations in', carrersPath);
    }
}
