const fs = require('fs');
const path = require('path');

const attrs = {
    'class=': 'className=',
    'for=': 'htmlFor=',
    'stroke-width=': 'strokeWidth=',
    'stroke-linecap=': 'strokeLinecap=',
    'stroke-linejoin=': 'strokeLinejoin=',
    'fill-rule=': 'fillRule=',
    'clip-rule=': 'clipRule=',
    'tabindex=': 'tabIndex=',
    'autocomplete=': 'autoComplete=',
    'autofocus=': 'autoFocus=',
    'readonly=': 'readOnly=',
    'maxlength=': 'maxLength=',
    'crossorigin=': 'crossOrigin=',
    'charset=': 'charSet=',
};

const voidTags = ['img', 'input', 'br', 'hr', 'source', 'col'];

function htmlToJsx(html) {
    let jsx = html;

    // extract body content
    const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
        jsx = bodyMatch[1];
    }

    // Replace attributes
    for (const [key, value] of Object.entries(attrs)) {
        jsx = jsx.replace(new RegExp(key, 'g'), value);
    }

    // Replace style strings with empty
    jsx = jsx.replace(/style="[^"]*"/g, '');

    // Remove scripts
    jsx = jsx.replace(/<script[\s\S]*?<\/script>/gi, '');

    // self close tags
    voidTags.forEach(tag => {
        const r = new RegExp(`(<${tag}[^>]*?)(?<!/)>`, 'gi');
        jsx = jsx.replace(r, '$1 />');
    });

    // remove HTML comments
    jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

    return jsx;
}

const dir = path.join(__dirname, 'stitch_htmls');
const outDir = path.join(__dirname, 'src', 'pages');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(dir);
files.forEach(file => {
    if (file.endsWith('.html')) {
        const html = fs.readFileSync(path.join(dir, file), 'utf8');
        const jsx = htmlToJsx(html);
        const name = file.replace('.html', '');
        const compName = name.charAt(0).toUpperCase() + name.slice(1);

        const out = `import React from 'react';\n\nexport default function ${compName}() {\n  return (\n    <div className="w-full h-full min-h-screen bg-white">\n      ${jsx}\n    </div>\n  );\n}\n`;
        fs.writeFileSync(path.join(outDir, `${compName}.jsx`), out);
        console.log(`Converted ${file} to ${compName}.jsx without scripts`);
    }
});
