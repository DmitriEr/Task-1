const { Chiper } = require('../src/transforms/CustomChipers');

describe('проверить требуется ли кодировка', () => {
    const chiper = new Chiper('C0');

    test('checkNeedChiper', () => {
        for (let i = 0; i <= 10; i++) {
            const result = chiper.checkNeedChiper(i);
            if (i >= 65 && i <= 90) {
                expect(result).toEqual({ isNeedChiper: true, size: { max: 90, min: 65 }});
            } else if (i >= 97 && i <= 122) {
                expect(result).toEqual({ isNeedChiper: true, size: { max: 122, min: 97 }});
            } else {
                expect(result).toEqual({ isNeedChiper: false, size: { max: 122, min: 97 } });
            }
        }
    }) 
});