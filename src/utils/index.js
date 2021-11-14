const getConfig = (value, input, output, chiper) => {
    value.forEach((item, index, arr) => {
        if (/^(-i|--input)$/.test(item)) {
            input.count++;
            input.value = arr[index + 1];
        };
        if (/^(-o|--output)$/.test(item)) {
            output.count++;
            output.value = arr[index + 1];
        };
        if (/^(-c|--config)$/.test(item)) {
            chiper.count++;
            chiper.value = arr[index + 1];
        }
    })
}

module.exports = { getConfig }