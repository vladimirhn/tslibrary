
export default class Strings {

    static addPlus = (str) => {
        return "+" + Strings.clearString(str);
    }

    static addMinus = (str) => {
        return "-" + Strings.clearString(str);
    }

    static clearString = (str) => {
        if (str.startsWith("+" || str.startsWith("-"))) {
            return str.substring(1);
        }
        return str;
    }
}