export default function fetchingEffect(dataSet, updateFunct) {

    return function () {
        dataSet.fetchingEventProc.addFetchingListener(updateFunct);
        return () => {
            dataSet.fetchingEventProc.removeFetchingListener(updateFunct);
        }
    }
}