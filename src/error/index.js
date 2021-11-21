const path = require('path');
const fs = require('fs');

const { ERROR_TYPE } = require('../constants');

class CustomError {
    constructor(chiper, output = null, input = null, pathDir) {
        this.chiper = chiper;
        this.output = output;
        this.input = input;
        this.pathDir = pathDir;
    }

    checkValues() {
        if (!this.chiper.value || !/^(C0|C1|R0|R1|A)(-(C0|C1|R0|R1|A)){0,}$/.test(this.chiper.value)) return ERROR_TYPE.error_config;
        if (this.chiper.count > 1) return ERROR_TYPE.repeat_config;
        if (this.input?.count > 1) return ERROR_TYPE.repeat_input;
        if (this.output?.count > 1) return ERROR_TYPE.repeat_output;
        if (this.input?.count && !this.input?.value) return ERROR_TYPE.empty_input;
        if (this.output?.count && !this.output?.value) return ERROR_TYPE.empty_output;
        if (this.input?.value) {
            const pathInput = path.join(this.pathDir, this.input.value);
            if (!fs.existsSync(pathInput)) return ERROR_TYPE.exist_input;
        }
        if (this.output?.value) {
            const pathOutput = path.join(this.pathDir, this.output.value);
            if (!fs.existsSync(pathOutput)) return ERROR_TYPE.exist_output;
        }
        return '';
    }
}

module.exports = CustomError;