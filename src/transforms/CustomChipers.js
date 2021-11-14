const { Transform } = require('stream');

class Chiper extends Transform {
    constructor() {
        super();
        this.sizes = {
            small: { min: 97, max: 122 },
            title: { min: 65, max: 90 },
        };
    }

    checkNeedChiper(code) {
        const { small, title } = this.sizes;
        let size = small;

        if (code >= title.min && code <= title.max) {
            size = title;
        }
        
        const isNeedChiper = code >= size.min && code <= size.max;
        
        return { isNeedChiper, size };
    }

    getLetter(code, chiper) {
        const { isNeedChiper, size } = this.checkNeedChiper(code);

        if (isNeedChiper) {
            let result = code + this[chiper];
            if (result < size.min) result = size.max - size.min % result + 1;
            if (result > size.max) result = size.min + result % size.max - 1;
            return result;
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

    getLetter(code) {
        const { isNeedChiper, size } = this.checkNeedChiper(code);

        if (isNeedChiper) {
            return size.max - (code - size.min);
        }

        return code;
    }
}

module.exports = { ChiperCeaser, ChiperROT8, ChiperAtbash };