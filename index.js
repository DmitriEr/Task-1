const fs = require('fs');
const path = require('path');
const { stdout, stdin, argv } = require('process');
const { ChiperCeaser, ChiperROT8, ChiperAtbash } = require('./src/transform');

const { input, output, chiper } = require('./src/constants');
const { setError, getConfig } = require('./src/utils');
const { pipeline } = require('stream');

const value = argv.slice(2);

getConfig(value, input, output, chiper);

const pathInput = path.join(__dirname, input.value);

const outputInput = path.join(__dirname, output.value);

setError(!chiper.value.length, 'параметр -c или --config обязателен');
setError(chiper.count > 1, 'параметр -c или --config дублируется');
setError(input.count > 1, 'параметр -i или --input дублируется');
setError(output.count > 1, 'параметр -o или --output дублируется');
setError(!fs.existsSync(pathInput), 'Input файл не существует');
setError(!fs.existsSync(outputInput), 'Output файл не существует');

const readSteam = input.value ? fs.createReadStream(input.value) : stdin;

const writeStream = output.value ? fs.createWriteStream(output.value, { flags: 'a' }) : stdout;

// const chiper_cli_tool = new Transform({
//     transform: (chunk, _, done) => {
//         let text = chunk.toString();
//         const array = chiper.value.split('-');
//         array.forEach((item) => {
//             text = [...text].reduce((acc, prev) => {
//                 if (CHIPERS[item]) {
//                     return acc += String.fromCodePoint(getLetter(prev.codePointAt(), CHIPERS[item]));
//                 } else {
//                     stderr.write(`параметр кодировки ${item} не валиден. Валидные значения кодировки С0, С1, R0, R1, A`);
//                     exit();
//                 }
//             }, '');
//         })
//         done(null, text);
//     }
// })

const ceaser = new ChiperCeaser(chiper.value);
const rot8 = new ChiperROT8(chiper.value);
const atbash = new ChiperAtbash(chiper.value);

pipeline(
    readSteam,
    ceaser,
    rot8,
    atbash,
    writeStream,
    (err) => {
        if (err) {
            console.log(err);
        }
    }
)
