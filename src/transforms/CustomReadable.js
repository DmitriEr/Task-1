const { stderr } = require('process');
const { Readable } = require('stream');
const fs = require('fs');

class CustomReadable extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
        }
    _read(n) {
        const buf = Buffer.alloc(n);
        if (this.filename) {
            fs.open(this.filename, (err, fd) => {
                if (err) {
                    stderr.write('Ошибка при чтении');
                } else {
                    fs.read(3, buf, 0, n, null, (err, bytesRead) => {
                        if (err) {
                            stderr.write('Ошибка при чтении');
                        } else {
                            this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
                        }
                    })
                }
            })
        }
    }
}

module.exports = CustomReadable;