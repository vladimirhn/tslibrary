import React, {FunctionComponent} from 'react';

import './subMenuArea.css';
import {SubMenuEntry} from "../../menu/SubMenuEntry";
import Page from "../../../../../pages/Page";

interface properties {
    currentSubMenuEntries: Page[];
    setCurrentPage: (page:Page) => void;
    currentPage: Page;
}

export const SubMenuArea: FunctionComponent<properties> = ({ currentSubMenuEntries, setCurrentPage, currentPage }) => {

        const entries = currentSubMenuEntries.map((page, index) => {

            return <SubMenuEntry
                key={index}
                page={page}
                setCurrentPage={setCurrentPage}
                isSelected={page === currentPage}
            />;
        });

        return <div className="sub-menu-area">
            {entries}
        </div>
}