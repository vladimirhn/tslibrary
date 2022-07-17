import InnerDispatcher from "./InnerDispatcher";

export default function innerEventEffect(event, meth) {

    return function () {
        InnerDispatcher.addSubscription(event, meth);
        return () => {
            InnerDispatcher.removeSubscription(event, meth);
        }
    }
}