const path = require('path');
const fs = require('fs');
const { stderr, exit } = require('process');

class CustomError {
    constructor(chiper, output, input, pathDir) {
        this.chiper = chiper;
        this.output = output;
        this.input = input;
        this.pathDir = pathDir;
    }

    checkValues() {
        if (!this.chiper.value || !/^(C0|C1|R0|R1|A)(-(C0|C1|R0|R1|A)){0,}$/.test(this.chiper.value)) {
            stderr.write('config отсутствует или не валиден');
            exit(1);
        }
        if (this.chiper.count > 1) {
            stderr.write('config повторяется более одного раза');
            exit(1);
        }
        if (this.input.count > 1) {
            stderr.write('input повторяется более одного раза');
            exit(1);
        }
        if (this.output.count > 1) {
            stderr.write('output повторяется более одного раза');
            exit(1);
        }
        if (this.input.count && !this.input.value) {
            stderr.write('в аргумент input не переданно значение');
            exit(1);
        }
        if (this.output.count && !this.output.value) {
            stderr.write('в аргумент output не переданно значение');
            exit(1);
        }
        if (this.input.value) {
            const pathInput = path.join(this.pathDir, this.input.value);
            if (!fs.existsSync(pathInput)) {
                stderr.write('переданный путь до input файла не существует');
                exit(1);
            }
        }
        if (this.output.value) {
            const pathOutput = path.join(this.pathDir, this.output.value);
            if (!fs.existsSync(pathOutput)) {
                stderr.write('переданный путь до output файла не существует');
                exit(1);
            }
        }
        if (!this.input.value && this.input.count === 1) {
            stderr.write('передан пустой аргумент input');
            exit(1);
        }
        if (!this.output.value && this.output.count === 1) {
            stderr.write('передан пустой аргумент output');
            exit(1);
        }
    }
}

module.exports = CustomError;