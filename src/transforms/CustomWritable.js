const { stdout } = require('process');
const { Writable } = require('stream');
const fs = require('fs');

class CustomWritable extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }
    _write(chunk, _, callback) {
        const text = chunk.toString();
        console.log(text);
        if (this.filename) {
            fs.writeFile(this.filename, text, { flag: 'a' }, (err) => {
                console.log(err);
            });
        } else {
            stdout.write(text);
        }
        callback();
    }
}

module.exports = CustomWritable;