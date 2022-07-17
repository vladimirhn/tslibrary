import React, {FunctionComponent} from 'react';

import './mainMenuEntry.css';
import Page from "../../../../pages/Page";

interface properties {
        page: Page;
        processMainMenuChoice: (page: Page) => void
}

export const MainMenuEntry: FunctionComponent<properties> = ({ page , processMainMenuChoice}) => {

        if (!processMainMenuChoice || !page) return null;

        return <div
            className="main-menu-entry"
            onClick={processMainMenuChoice.bind(null, page)}
        >

            {page.title}

        </div>
}