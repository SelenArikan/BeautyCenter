const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = {
    '#A65E6E': '#ec4cc7',
    '#a65e6e': '#ec4cc7',
    '#2C3E50': '#000000',
    '#2c3e50': '#000000',
    '#F5F5F0': '#ffffff',
    '#f5f5f0': '#ffffff',
    '#F6D4DB': '#f9def1',
    '#f6d4db': '#f9def1',
    // The logo and slogan fonts are replaced directly in the layout and config files.
};

function walkSync(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walkSync(filepath, filelist);
        } else {
            if (filepath.endsWith('.tsx') || filepath.endsWith('.ts') || filepath.endsWith('.php') || filepath.endsWith('.css')) {
                filelist.push(filepath);
            }
        }
    }
    return filelist;
}

const filesToProcess = walkSync(srcDir);

for (const file of filesToProcess) {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanged = false;
    
    for (const [oldVal, newVal] of Object.entries(replacements)) {
        if (content.includes(oldVal)) {
            content = content.split(oldVal).join(newVal);
            hasChanged = true;
        }
    }
    
    if (hasChanged) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
