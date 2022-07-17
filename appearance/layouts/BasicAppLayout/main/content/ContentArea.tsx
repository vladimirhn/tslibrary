import React, {FunctionComponent} from 'react';

import './contentArea.css';
import Page from "../../../../../pages/Page";

interface properties {
    currentPage: Page;
}

export const ContentArea: FunctionComponent<properties> = ({ currentPage }) => {

    return <div className="content-area">
        {currentPage.widget}
    </div>
}