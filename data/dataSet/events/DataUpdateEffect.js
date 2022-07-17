export default function dataUpdateEffect(dataSet, forceRerender) {

    return function () {
        dataSet.updateEventProc.addDataUpdateListener(forceRerender);
        return () => {
            dataSet.updateEventProc.removeDataUpdateListener(forceRerender);
        }
    }
}