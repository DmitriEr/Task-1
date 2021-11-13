const { stdout, stderr } = require('process');
const { Writable } = require('stream');
const fs = require('fs');

class CustomWritable extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }
    _write(chunk, _, callback) {
        const text = chunk.toString();
        if (this.filename) {
            fs.writeFile(this.filename, text, { flag: 'a' }, (err) => {
                if (err) stderr.write('Ошибка при записи файла');
            });
        } else {
            stdout.write(text);
        }
        callback();
    }
}

module.exports = CustomWritable;