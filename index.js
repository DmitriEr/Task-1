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

// const writeStream = output.value ? fs.createWriteStream(output.value, { flags: 'a' }) : stdout;
const writeStream = output.value ? fs.createWriteStream(output.value) : stdout;

const chiper_cli_tools = () => {
    return chiper.value.split('-').reduce((acc, prev) => {
        if(/(C0|C1)/.test(prev)) acc.push(new ChiperCeaser(prev));
        if(/(R0|R1)/.test(prev)) acc.push(new ChiperROT8(prev));
        if(/A/.test(prev)) acc.push(new ChiperAtbash(prev));
        return acc;
    }, [])
}
const chipers = chiper_cli_tools();

pipeline(
    readSteam,
    ...chipers,
    writeStream,
    (err) => {
        if (err) {
            console.log(err);
        }
    }
)
