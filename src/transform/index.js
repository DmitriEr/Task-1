const { Transform } = require('stream');

const { SIZES } = require('../constants');

class Chiper extends Transform {
    constructor() {
        super();
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

    chiperTemplate(value, chiper) {
        let text = value;
        text = [...text].reduce((acc, prev) => acc += String.fromCodePoint(this.getLetter(prev.codePointAt(), chiper)), '');
        return text;
    }

    _transform(chunk, _, callback) {
        let text = chunk.toString();
        text = this.chiperTemplate(text, this.chiper);
        callback(null, text);
    }
}

class ChiperCeaser extends Chiper {
    constructor(chiper) {
        super();
        this.C0 = -1;
        this.C1 = 1;
        this.chiper = chiper;
    }
}

class ChiperROT8 extends Chiper {
    constructor(chiper) {
        super();
        this.R0 = -8;
        this.R1 = 8;
        this.chiper = chiper;
    }
}

class ChiperAtbash extends Chiper {
    constructor(chiper) {
        super();
        this.chiper = chiper;
    }
}

module.exports = { ChiperCeaser, ChiperROT8, ChiperAtbash };