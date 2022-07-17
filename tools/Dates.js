
export default class Dates {


    static getToday = () => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        return yyyy + "-" + mm + "-" + dd;
    }

    static rusDateStringToIsoDateString = (rusDate) => {

        const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

        if (pattern.test(rusDate)) {
            return rusDate.replace(pattern, '$3-$2-$1');
        }

        return rusDate;
    }

    static isoDateStringToRusDateString = (isoDate) => {

        const pattern = /(\d+)-(\d+)-(\d+)/;

        if (pattern.test(isoDate)) {
            return isoDate.replace(pattern, '$3.$2.$1');
        }

        return isoDate;
    }

    static extractDateFromLocalDateTime = (timestamp) => { //2022-04-21T00:00:00
        if (timestamp) {

            if (timestamp.includes("T")) {
                return timestamp.split("T")[0]; //Если содержит Т, возвращаем дату

            } else {
                return timestamp; // Если не содержит Т, возвращам как есть
            }

        } else {
            return ""; //Если нулл, то возвращаем пустую строку
        }
    }
}