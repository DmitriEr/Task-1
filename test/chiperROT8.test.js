const { ChiperROT8 } = require('../src/transforms/CustomChipers');

const text = 'This is secret. Message about "_" symbol!';

const MOCK_LETTER = [
    { code: 65, type: 'R1', result: 73, description: 'получить следущее число от минимального' },
    { code: 65, type: 'R0', result: 83, description: 'получить предыдущее число от минимального' },
    { code: 77, type: 'R1', result: 85, description: 'получить следущее число от среднего' },
    { code: 77, type: 'R0', result: 69, description: 'получить предыдущее число от минимального' },
    { code: 122, type: 'R1', result: 104, description: 'получить следущее число от максимального' },
    { code: 122, type: 'R0', result: 114, description: 'получить предыдущее число от минимального' },
    { code: 60, type: 'R1', result: 60, description: 'получить исходный код при encode' },
    { code: 95, type: 'R0', result: 95, description: 'получить исходный код при decode' },
];

const MOCK_TEXT = [
    {
        type: 'R1',
        result: 'Bpqa qa amkzmb. Umaaiom ijwcb "_" agujwt!',
        description: 'текст шифра encode',
        text
    },
    { 
        type: 'R0',
        result: 'Lzak ak kwujwl. Ewkksyw stgml "_" kqetgd!',
        description: 'текст шифра decode', 
        text
    },
    { 
        type: 'R0',
        text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        result: 'STUVWXYZABCDEFGHIJKLMNOPQR', 
        description: 'decode алфавит'
    },
    { 
        type: 'R1',
        text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        result: 'IJKLMNOPQRSTUVWXYZABCDEFGH', 
        description: 'decode алфавит'
    },
];

describe('проверить шифр Atbash', () => {
    const chiper = new ChiperROT8('R1');

    MOCK_LETTER.forEach(({ code, type, result, description }) => {
        test(description, () => {
            const data = chiper.getLetter(code, type);
            expect(data).toEqual(result)
        })
    })

    MOCK_TEXT.forEach(({ text, type, result, description }) => {
        test(description, () => {
            const data = chiper.chiperTemplate(text, type);
            expect(data).toEqual(result);
        })
    })
});