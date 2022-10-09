import React, {FunctionComponent} from 'react';
import './header.css';

import {AuthWidget} from "./AuthWidget";
import Pages from "../../../../pages/Pages";

interface properties {
    pages: Pages;
}

export const Header: FunctionComponent<properties> = ({ pages }) => {

    return <header className="App-header">
        <AuthWidget/>
    </header>
}