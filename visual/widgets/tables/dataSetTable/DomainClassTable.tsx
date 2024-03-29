import React, {FunctionComponent, useEffect, useReducer, useState} from 'react';
import {DataSetTableWidget} from "./DataSetTableWidget";
import Class from "../../../../reflection/Class";
import DomainClass from "../../../../reflection/DomainClass";
import TableConfig from "./TableConfig";
import Domain from "../../../../../application/domain/Domain";
import Repository from "../../../../data/backend/Repository";

interface properties {
    klass: Class<DomainClass<any>>;
    config: TableConfig;
}

export const DomainClassTable: FunctionComponent<properties> = ({klass, config}) => {

    const [repository, setRepository] = useState<Repository<any>>(Repository.empty(klass));

    useEffect(() => {
        repository.initialFetchAll(setRepository);
    }, [])

    return <DataSetTableWidget
        repository={repository}
        config={config}
    />
}