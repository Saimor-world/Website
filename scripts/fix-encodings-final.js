const fs = require('fs');
const path = require('path');

const replacements = {
    'SaimÃ´r': 'Saimôr',
    'MÃ´ra': 'Môra',
    'Ã¤': 'ä',
    'Ã¼': 'ü',
    'Ã¶': 'ö',
    'ÃŸ': 'ß',
    'Ã„': 'Ä',
    'Ã–': 'Ö',
    'Ãœ': 'Ü',
    'â€“': '–',
    'â†’': '→',
    'â†': '←',
    'Ã‚Â·': '·',
    'Â·': '·',
    'Ã‚Â´': '\'',
    'â€ž': '„',
    'â€œ': '“',
    'âœ“': '✓',
    'â€™': '\'',
    'ÃƒÂ´': 'ô',
    'ÃƒÂ¤': 'ä',
    'ÃƒÂ¼': 'ü',
    'ÃƒÂ¶': 'ö',
    'â€¦': '...',
    'â€': '—', // Sometimes â€ is followed by something else, but often it's an em-dash or similar.
};

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (!f.startsWith('.') && f !== 'node_modules' && f !== '.next') {
                walkDir(dirPath, callback);
            }
        } else {
            if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.md')) {
                callback(dirPath);
            }
        }
    });
}

const targetDirs = ['app', 'components', 'lib'];
targetDirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
        walkDir(fullPath, (filePath) => {
            let content = fs.readFileSync(filePath, 'utf8');
            let changed = false;
            for (const [key, value] of Object.entries(replacements)) {
                if (content.includes(key)) {
                    console.log(`Fixing ${key} in ${filePath}`);
                    content = content.split(key).join(value);
                    changed = true;
                }
            }
            if (changed) {
                fs.writeFileSync(filePath, content, 'utf8');
            }
        });
    }
});

console.log('Encoding fix complete.');
