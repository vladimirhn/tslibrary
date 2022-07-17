import Arrays from "../tools/Arrays";

export default class InnerDispatcher {

        static register = {};

        static addSubscription = (event, method) => {
            if (!InnerDispatcher.register[event]) {
                InnerDispatcher.register[event] = [];
            }

            if (!InnerDispatcher.register[event].includes(method)) {
                InnerDispatcher.register[event].push(method);
            }
        }

        static removeSubscription = (event, method) => {
            if (InnerDispatcher.register[event].includes(method)) {
                Arrays.remove(InnerDispatcher.register[event], method);
            }
        }

        static fireEvent = (event) => {
            if (InnerDispatcher.register[event]) {
                for (let meth of InnerDispatcher.register[event]) {
                    meth();
                }
            }
        }
}