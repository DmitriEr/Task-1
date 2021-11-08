const { Transform } = require('stream');

const { CHIPERS } = require('../constants');
const { getLetter } = require('../utils');

class Chiper extends Transform {
    constructor(options) {
        super(options);
    }

    _getCountChiper() {
        return [];
    }

    _transform(chunk, _, done) {
        let text = chunk.toString();
        this._getCountChiper().forEach((item) => {
            text = [...text].reduce((acc, prev) => acc += String.fromCodePoint(getLetter(prev.codePointAt(), CHIPERS[item])), '');
        })
        done(null, text);
    }
}

class ChiperCeaser extends Chiper {
    constructor(array) {
        super();
        this.array = array;
    }

    _getCountChiper() {
        return this.array.split('-').filter((item) => /C(0|1)/.test(item));
    }
}

class ChiperROT8 extends Chiper {
    constructor(array) {
        super();
        this.array = array;
    }

    _getCountChiper() {
        return this.array.split('-').filter((item) => /R(0|1)/.test(item));
    }
}

class ChiperAtbash extends Chiper {
    constructor(array) {
        super();
        this.array = array;
    }

    _getCountChiper() {
        return this.array.split('-').filter((item) => /A/.test(item));
    }
}

module.exports = { ChiperCeaser, ChiperROT8, ChiperAtbash };