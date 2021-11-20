const { ChiperAtbash } = require('../src/transforms/CustomChipers');

const text = 'This is secret. Message about "_" symbol!';

const MOCK_LETTER = [
    { code: 65, type: 'A', result: 90, description: 'atbash минимальное' },
    { code: 77, type: 'A', result: 78, description: 'atbash среднее' },
    { code: 122, type: 'A', result: 97, description: 'atbash максимальное' },
    { code: 60, type: 'A', result: 60, description: 'получить исходный код при encode' },
    { code: 95, type: 'A', result: 95, description: 'получить исходный код при decode' },
];

const MOCK_TEXT = [
    {
        type: 'A',
        result: 'Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!',
        description: 'текст шифра',
        text
    },
    { 
        type: 'A',
        text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        result: 'ZYXWVUTSRQPONMLKJIHGFEDCBA',
        description: 'отзеркалить алфавит', 
    },
];

describe('проверить шифр Atbash', () => {
    const chiper = new ChiperAtbash('A');

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