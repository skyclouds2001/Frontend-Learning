const fs = require('fs');

fs.readFile('./2.txt', 'utf8', (err, res) => {
    if(err) {
        return console.error(err);
    }
    const data = res.split(' ').map(v => v.replace('=', ':')).join('\r\n');

    fs.writeFile('./2_i.txt', data, err => {
        if(err) {
            console.error(err);
        }
    });
});
