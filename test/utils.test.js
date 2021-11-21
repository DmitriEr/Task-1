const { getConfig } = require('../src/utils');
const { input, output, chiper } = require('../src/constants');

const MOCK_CONFIG = [ '-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', './output.txt' ];

const MOCK_DATA_CHECK_COUNT = [
    { data: [ ...MOCK_CONFIG ], count: [1, 1, 1], description: 'полный конфиг' },
    { data: [], count: [0, 0, 0], description: 'пустой конфиг' },
    { data: [ '-c', 'C0', ...MOCK_CONFIG ], count: [1, 1, 2], description: '-с дублируются' },
    { data: [ '-i', './input.txt', ...MOCK_CONFIG ], count: [2, 1, 1], description: '-i дублируются' },
    { data: [ '-o', './output.txt', ...MOCK_CONFIG ], count: [1, 2, 1], description: '-o дублируются' },
    { data: [ ...MOCK_CONFIG, ...MOCK_CONFIG ], count: [2, 2, 2], description: '-c, -i, -o дублируются' },
];

const MOCK_DATA_CHECK_VALUE = [
    { data: [ ...MOCK_CONFIG ], values: [ './input.txt', './output.txt', 'C1-C1-R0-A' ], description: 'получить значение' },
    { data: [], values: [ '', '', '' ], description: 'значение отсутствует' },
    { data: [ '-c', 'C0' ], values: [ '', '', 'C0' ], description: 'присутствует только -с' },
    { data: [ '-i', './input.txt' ], values: [ './input.txt', '', '' ], description: 'присутствует только -i' },
    { data: [ '-o', './output.txt' ], values: [ '', './output.txt', '' ], description: 'присутствует только -o' },
]

describe('testing function getConfig', () => {
    beforeEach(() => {
        input.count = 0;
        output.count = 0;
        chiper.count = 0;
    });
    afterEach(() => {
        input.value = '';
        output.value = '';
        chiper.value = '';
    });
    test('getConfig возвращает void', () => {
        const result = getConfig([], input, output, chiper);
        expect(result).toEqual(undefined);
    });
    MOCK_DATA_CHECK_COUNT.forEach(({ data, count, description }) => {
        test(description, () => {
            getConfig(data, input, output, chiper);
            expect(input.count).toEqual(count[0]);
            expect(output.count).toEqual(count[1]);
            expect(chiper.count).toEqual(count[2]);
        })
    });
    MOCK_DATA_CHECK_VALUE.forEach(({ data, values, description }) => {
        test(description, () => {
            getConfig(data, input, output, chiper);
            expect(input.value).toEqual(values[0]);
            expect(output.value).toEqual(values[1]);
            expect(chiper.value).toEqual(values[2]);
        })
    });
});