
export default class Input {

    static isNumber = (input) => {
        return /^\d+$/.test(input);
    }
}