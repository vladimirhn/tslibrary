import React, {FunctionComponent} from 'react';

import './subMenuEntry.css';
import Page from "../../../../pages/Page";

interface properties {
    page: Page;
    setCurrentPage: (page:Page) => void;
    isSelected: boolean;
}

export const SubMenuEntry: FunctionComponent<properties> = ({ page, setCurrentPage, isSelected }) => {

    if (!page || !setCurrentPage) return null;

    let className = "sub-menu-entry";
    if (isSelected) className = "sub-menu-entry sub-menu-selected-entry";

    return <div
        className={className}
        onClick={setCurrentPage.bind(null, page)}
    >

        {page.title}

    </div>
}