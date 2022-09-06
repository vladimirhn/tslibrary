import React, {FunctionComponent} from 'react';

import './main.css';
import {SubMenuArea} from "./submenu/SubMenuArea";
import {ContentArea} from "./content/ContentArea";
import Page from "../../../../pages/Page";

interface properties {
    currentSubMenuEntries: Page[];
    setCurrentPage: (page:Page) => void;
    currentPage: Page;
}

export const Main: FunctionComponent<properties> = ({ currentSubMenuEntries, setCurrentPage, currentPage }) => {

        return <main>

            <SubMenuArea
                currentSubMenuEntries={currentSubMenuEntries}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />

            <ContentArea
                currentPage={currentPage}
            />

        </main>
}