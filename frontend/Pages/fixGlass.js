const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Find .glass background definition and make it transparent/frosty
            // Matches index.html style
            content = content.replace(
                /(\.glass\s*{[^}]*background:\s*)rgba\(0,\s*0,\s*0,\s*0\.9\);/g,
                '$1rgba(0, 0, 0, 0.2);'
            );
            // Matches careers.html style
            content = content.replace(
                /(\.glass\s*{[^}]*background:\s*)rgba\(0,\s*0,\s*0,\s*0\.4\);/g,
                '$1rgba(0, 0, 0, 0.2);'
            );
            
            // Just for safety if it matches anything else
            content = content.replace(
                /(\.glass\s*{[^}]*backdrop-filter:\s*blur\()\d+(px\);)/g,
                '$120$2'
            );

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}
console.log('Restored airy/frosted transparent glass effect to navbars');
