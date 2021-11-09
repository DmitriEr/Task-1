const { Transform } = require('stream');

const { SIZES } = require('../constants');

class Chiper extends Transform {
    constructor(options) {
        super(options);
    }

    getCountChiper(regexp) {
        return this.array.split('-').filter((item) => regexp.test(item));
    }

    getLetter(code, chiper) {
        const { small, title } = SIZES;
        let size = small;

        if (code >= title.min && code <= title.max) {
            size = title
        }

        const isNeedChiper = code >= size.min && code <= size.max;

        if (isNeedChiper && this[chiper]) {
            let result = code + this[chiper];
            if (result < size.min) result = size.max - size.min % result + 1;
            if (result > size.max) result = size.min + result % size.max - 1;
            return result;
        }

        if (isNeedChiper && !this[chiper]) {
            return size.max - (code - size.min);
        }

        return code;
    }

    chiperTemplate(regexp, value) {
        let text = value;
        console.log(this.getCountChiper(regexp))
        this.getCountChiper(regexp).forEach((item) => {
            text = [...text].reduce((acc, prev) => acc += String.fromCodePoint(this.getLetter(prev.codePointAt(), item)), '');
        })
        return text;
    }

    _transform(chunk, _, done) {
        let text = chunk.toString();
        text = this.chiperTemplate(this.regexp, text);
        done(null, text);
    }
}

class ChiperCeaser extends Chiper {
    constructor(array) {
        super();
        this.array = array;
        this.C0 = -1;
        this.C1 = 1;
        this.regexp = /(C0|C1)/;
    }
}

class ChiperROT8 extends Chiper {
    constructor(array) {
        super();
        this.array = array;
        this.R0 = -8;
        this.R1 = 8;
        this.regexp = /(R0|R1)/;
    }
}

class ChiperAtbash extends Chiper {
    constructor(array) {
        super();
        this.array = array;
        this.regexp = /A/;
    }
}

module.exports = { ChiperCeaser, ChiperROT8, ChiperAtbash };