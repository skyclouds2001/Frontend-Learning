const fs = require('fs');
const path = require('path');

const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

fs.readFile(path.join(__dirname, './s/index.html'), 'utf8', (err, data) => {
    if(err)
        return console.log(err.message);

    resolveCSS(data);
    resolveJS(data);
    resolveHTML(data);
});

/**
 * resolve CSS
 * @param {string} str
 */
function resolveCSS (str) {
    const [ res, ] = regStyle.exec(str);

    const css = res.replace('<style>', '').replace('</style>', '');

    fs.writeFile(path.join(__dirname, './index.css'), css, (err) => {
        if (err)
            return console.log(err.message);
        console.log('Write CSS success!');
    });
}

/**
 * resolve JavaScript
 * @param {string} str
 */
function resolveJS (str) {
    const [ res, ] = regScript.exec(str);

    const js = res.replace('<script>', '').replace('</script>', '');

    fs.writeFile(path.join(__dirname, './index.js'), js, (err) => {
        if (err)
            return console.log(err.message);
        console.log('Write JS success!');
    });
}

/**
 * resolve HTML
 * @param {string} str
 */
function resolveHTML (str) {
    const html = str.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>');
    fs.writeFile(path.join(__dirname, './index.html'), html, (err) => {
        if(err)
            return console.log(err);
        console.log('Write HTML success!');
    });
}
