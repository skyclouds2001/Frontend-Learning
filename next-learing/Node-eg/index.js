const fs = require('fs');
const path = require('path');

// fs.stat(__dirname + './n0.js', (err, stats) => {
//     if(err) {
//         return console.error(err);
//     }
//     console.log(stats);
// });

fs.readFile(path.join(__dirname, './0.txt'), 'utf8', (err, res) => {
    if(err) {
        return console.error(err);
    }
    console.log(res);
});

// fs.writeFile(__dirname + './1.txt', 'ooooooooooo', (err) => {
//     if(err) {
//         return console.error(err);
//     }
// });

// fs.open(__dirname + './0.txt', 'r', (err, fd) => {
//     if(err) {
//         return console.error(err);
//     }
//     console.log(fd);
// });
