const CustomError = require('../src/error');

const { ERROR_TYPE, input, output, chiper } = require('../src/constants');

const ERRORS = [
    { description: 'config отсутствует', chiper, input, output, result: ERROR_TYPE.error_config },
    { description: 'config не валидный', chiper: { value: 'C0-A0', count: 1 }, input, output, result: ERROR_TYPE.error_config },
    { description: 'config повторяется', chiper: { value: 'C0', count: 2 }, input, output, result: ERROR_TYPE.repeat_config },
    { description: 'input повторяется', chiper: { value: 'C0', count: 1 }, input: { value: './input.txt', count: 2 } , output, result: ERROR_TYPE.repeat_input },
    { description: 'output повторяется', chiper: { value: 'C0', count: 1 }, input, output: { value: './output.txt', count: 2 }, result: ERROR_TYPE.repeat_output },
    { description: 'output пустой', chiper: { value: 'C0', count: 1 }, input, output: { value: '', count: 1 }, result: ERROR_TYPE.empty_output },
    { description: 'input пустой', chiper: { value: 'C0', count: 1 }, output, input: { value: '', count: 1 }, result: ERROR_TYPE.empty_input },
    { description: 'output путь на сушестует', chiper: { value: 'C0', count: 1 }, input, output: { value: './hello/output.txt', count: 1 }, result: ERROR_TYPE.exist_output },
    { description: 'output путь на сушестует', chiper: { value: 'C0', count: 1 }, output, input: { value: './hello/input.txt', count: 1 }, result: ERROR_TYPE.exist_input },
    { description: 'верный конфиг', chiper: { value: 'C0', count: 1 }, result: '' },
    { description: 'верный конфиг', chiper: { value: 'C0', count: 1 }, input: { value: '../input.txt', count: 1 }, output: { value: '../output.txt', count: 1 } , result: '' },
]

describe('получить текст ошибки', () => {
    ERRORS.forEach(({ description, chiper, output, input, result }) => {
        test(description, () => {
            const ConfigError = new CustomError(chiper, output, input, __dirname);
            const text = ConfigError.checkValues();
            expect(text).toEqual(result);
        })
    })
});