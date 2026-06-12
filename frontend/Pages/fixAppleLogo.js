const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const targetSVG = '<svg class="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.23 3.91-1.2 2.34.02 3.77 1.25 4.38 2.19-4.27 2.1-3.38 8.8 1.63 11.24zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.84 1.53-2.95 1.51-.14-1.15.36-2.35 1.05-3.2z"/></svg>';
const newAppleLogo = '<img src="https://www.svgrepo.com/show/511330/apple-173.svg" class="h-5 w-5" style="filter: invert(1) brightness(100);" alt="Apple">';

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            if (content.includes(targetSVG)) {
                content = content.replace(targetSVG, newAppleLogo);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed Apple logo in', file);
            }
        }
    }
}
