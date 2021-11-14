const { argv, stdin, stderr, exit } = require('process');
const { pipeline } = require('stream');
const fs = require('fs');

const { ChiperCeaser, ChiperROT8, ChiperAtbash } = require('./src/transforms/CustomChipers');
const CustomWritable = require('./src/transforms/CustomWritable');
const CustomError = require('./src/error');
const { input, output, chiper } = require('./src/constants');
const { getConfig } = require('./src/utils');

const value = argv.slice(2);

getConfig(value, input, output, chiper);

const ConfigError = new CustomError(chiper, output, input, __dirname);

ConfigError.checkValues();

const getArrayChipers = () => {
    return chiper.value.split('-').reduce((acc, prev) => {
        if(/(C0|C1)/.test(prev)) acc.push(new ChiperCeaser(prev));
        if(/(R0|R1)/.test(prev)) acc.push(new ChiperROT8(prev));
        if(/A/.test(prev)) acc.push(new ChiperAtbash(prev));
        return acc;
    }, [])
};

const chipersArray = getArrayChipers();

const writeStream = new CustomWritable(output.value);
const readStream = input.value ? fs.createReadStream(input.value) : stdin;

pipeline(
    readStream,
    ...chipersArray,
    writeStream,
    (err) => {
        if (err) {
            stderr.write(err);
            exit(1);
        }
    }
);
