const { ChiperCeaser } = require('../src/transforms/CustomChipers');

const text = 'This is secret. Message about "_" symbol!';

const MOCK_LETTER = [
    { code: 65, type: 'C1', result: 66, description: 'получить следущее число от минимального' },
    { code: 65, type: 'C0', result: 90, description: 'получить предыдущее число от минимального' },
    { code: 77, type: 'C1', result: 78, description: 'получить следущее число от среднего' },
    { code: 77, type: 'C0', result: 76, description: 'получить предыдущее число от минимального' },
    { code: 122, type: 'C1', result: 97, description: 'получить следущее число от максимального' },
    { code: 122, type: 'C0', result: 121, description: 'получить предыдущее число от минимального' },
    { code: 60, type: 'C1', result: 60, description: 'получить исходный код при encode' },
    { code: 95, type: 'C0', result: 95, description: 'получить исходный код при decode' },
];

const MOCK_TEXT = [
    {
        type: 'C1',
        result: 'Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!',
        description: 'текст шифра encode',
        text
    },
    { 
        type: 'C0',
        result: 'Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!',
        description: 'текст шифра decode', 
        text
    },
    { 
        type: 'C0',
        result: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        text: 'BCDEFGHIJKLMNOPQRSTUVWXYZA', 
        description: 'decode алфавит'
    },
    { 
        type: 'C1',
        result: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        text: 'ZABCDEFGHIJKLMNOPQRSTUVWXY', 
        description: 'decode алфавит',
    },
];

describe('проверить шифр цезаря', () => {
    const chiper = new ChiperCeaser('C1');

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