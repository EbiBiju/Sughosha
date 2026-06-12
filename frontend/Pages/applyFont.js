const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\Test\\Downloads\\Shughosha\\frontend\\Pages',
    'c:\\Users\\Test\\OneDrive\\Documents\\Shughosha\\frontend\\Pages'
];

const fontLinks = `
    <!-- Premium Font: Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // 1. Add links before </head> if not already there
            if (!content.includes('Plus+Jakarta+Sans')) {
                content = content.replace('</head>', fontLinks + '\n</head>');
            }

            // 2. Inject font-family into body style if not already there
            if (!content.includes("'Plus Jakarta Sans'")) {
                if (content.includes('body {')) {
                    content = content.replace(/body\s*{/, "body {\n             font-family: 'Plus Jakarta Sans', sans-serif;");
                } else {
                    // Just append to the end of <style>
                    content = content.replace('</style>', "body { font-family: 'Plus Jakarta Sans', sans-serif; }\n    </style>");
                }
            }

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}
console.log('Applied premium font Plus Jakarta Sans to all pages.');
