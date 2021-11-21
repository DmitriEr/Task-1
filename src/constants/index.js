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

const ERROR_TYPE = {
    error_config: 'config отсутствует или не валиден',
    repeat_config: 'config повторяется более одного раза',
    repeat_input: 'input повторяется более одного раза',
    repeat_output: 'output повторяется более одного раза',
    empty_input: 'в аргумент input не переданно значение',
    empty_output: 'в аргумент input не переданно значение',
    exist_input: 'переданный путь до input файла не существует',
    exist_output: 'переданный путь до output файла не существует',
}

module.exports = {
    input,
    output,
    chiper,
    ERROR_TYPE,
}