import Arrays from "./Arrays";

export default class Dispatcher {

        static register = {};

        static addSubscription = (event, method) => {
            if (!Dispatcher.register[event]) {
                Dispatcher.register[event] = [];
            }

            if (!Dispatcher.register[event].includes(method)) {
                Dispatcher.register[event].push(method);
            }
        }

        static removeSubscription = (event, method) => {
            if (Dispatcher.register[event].includes(method)) {
                Arrays.remove(Dispatcher.register[event], method);
            }
        }

        static fireEvent = (event) => {
            if (Dispatcher.register[event]) {
                for (let meth of Dispatcher.register[event]) {
                    meth();
                }
            }
        }
}