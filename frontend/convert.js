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
};

const voidTags = ['img', 'input', 'br', 'hr', 'source', 'path', 'circle'];

function htmlToJsx(html) {
    let jsx = html;

    // extract body content
    const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
        jsx = bodyMatch[1];
    }

    // replace attributes
    for (const [key, value] of Object.entries(attrs)) {
        jsx = jsx.replace(new RegExp(key, 'g'), value);
    }

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

        // Some minor fixes for specific JSX compilation errors
        // inline style strings are not supported in React without converting to object
        // I will just remove style tags and inline styles if any, or leave it because Tailwind is mostly classes.
        let finalJsx = jsx.replace(/style="[^"]*"/g, '');

        const out = `import React from 'react';\n\nexport default function ${compName}() {\n  return (\n    <>\n      ${finalJsx}\n    </>\n  );\n}\n`;
        fs.writeFileSync(path.join(outDir, `${compName}.jsx`), out);
        console.log(`Converted ${file} to ${compName}.jsx`);
    }
});
