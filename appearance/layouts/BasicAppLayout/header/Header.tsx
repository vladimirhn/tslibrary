import React, {FunctionComponent} from 'react';
import './header.css';

import DropdownMenuButton from "./DropdownMenuButton";
import {AuthWidget} from "./AuthWidget";
import Page from "../../../../pages/Page";

interface properties {
    pages: Page[];
}

export const Header: FunctionComponent<properties> = ({ pages }) => {

    return <header className="App-header">

        <DropdownMenuButton menuEntries={pages}/>
        <AuthWidget/>
    </header>
}