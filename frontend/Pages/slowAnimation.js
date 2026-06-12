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

            // Find transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            // Replace with a fluid 'water' feel: transform 1.6s cubic-bezier(0.4, 0, 0.2, 1)
            if (content.includes('transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);')) {
                content = content.replace(
                    'transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);',
                    'transition: transform 1.8s cubic-bezier(0.25, 1, 0.5, 1);'
                );
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Updated ' + file);
            }
        }
    }
}
