import React, {FunctionComponent} from 'react';

import './aside.css';
import Page from "../../../../pages/Page";
import {MainMenuEntry} from "../menu/MainMenuEntry";

interface properties {
    pages: Page[];
    processMainMenuChoice: (page: Page) => void
}

export const Aside: FunctionComponent<properties> = ({ pages , processMainMenuChoice}) => {

        const entries = pages.map((page, index) => {
            return <MainMenuEntry
                key={index}
                page={page}
                processMainMenuChoice={processMainMenuChoice}
            />;
        });

        return <aside>
            {entries}
        </aside>
}