import DataSet from "../../data/dataSet/DataSet";

type DataSetConsumer =
    (param: DataSet<any>) => void;

export default DataSetConsumer;