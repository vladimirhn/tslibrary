import React, {FunctionComponent} from "react";
import Repository from "../../../../data/backend/Repository";

interface properties {
    repository:Repository<any>;
}

export const ManagementPanelDeleteButton: FunctionComponent<properties> = ({ repository }) => {

    return <button
        className="delete-button"
        onClick={repository.deleteSelected}
        disabled={repository.dataSet.allSelectedEntries.length === 0}
    >Удалить</button>
}