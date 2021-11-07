const input = {
    value: '',
    count: 0,
};
const output = {
    value: '',
    count: 0,
};

const chiper = {
    value: '',
    count: 0,
};

const CHIPERS = {
    C0: {
        number: -1,
        isConstant: true,
    },
    C1: {
        number: 1,
        isConstant: true,
    },
    R0: {
        number: -8,
        isConstant: true,
    },
    R1: {
        number: 8,
        isConstant: true,
    },
    A: {
        isMirror: true,
    },
}

const SIZES = {
    title: { min: 65, max: 90 },
    small: { min: 97, max: 122 },
};

module.exports = {
    input,
    output,
    chiper,
    CHIPERS,
    SIZES,
}