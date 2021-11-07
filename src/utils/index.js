const { SIZES } = require('../constants');

const { stderr, exit } = require('process');

const getLetter = (initialLetter, item) => {
    const { isConstant, isMirror, number } = item;
    const { title, small } = SIZES;

    let size = small;
    
    if (initialLetter >= title.min && initialLetter <= title.max) {
        size = title
    } 

    const isCheperSymbol = initialLetter >= size.min && initialLetter <= size.max; 

    if (isConstant && isCheperSymbol) {
        let result = initialLetter + number;
        if (result < size.min) result = size.max - size.min % result + 1;
        if (result > size.max) result = size.min + result % size.max - 1;
        return result;
    }

    if (isMirror && isCheperSymbol) {
        return size.max - (initialLetter - size.min);
    }
    return initialLetter;
}

const setError = (condition, text) => {
    if (condition) {
        stderr.write(text);
        exit();
    }
}

const getConfig = (value, input, output, chiper) => {
    value.forEach((item, index, arr) => {
        if (/^(-i|--input)$/.test(item)) {
            input.count++;
            input.value = arr[index + 1];
        };
        if (/^(-o|--output)$/.test(item)) {
            output.count++;
            output.value = arr[index + 1];
        };
        if (/^(-c|--config)$/.test(item)) {
            chiper.count++;
            chiper.value = arr[index + 1];
        }
    })
}

module.exports = { getLetter, setError, getConfig }