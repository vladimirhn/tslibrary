import './app.css';

import React, {FunctionComponent, useEffect, useState} from 'react';

import AppStateData from "../login/AppStateData";
import {LoginPage} from "../login/LoginPage";
import {ApplicationPage} from "./ApplicationPage";
import Page from "../../../../pages/Page";
import Context from "../../../../../reflection/Context";
import DataSchema from "../../../../../data/schema/DataSchema";
import BooleanState from "../../../../../data/dataObject/vanila/BooleanState";

interface properties {
    pages: Page[];
}

export const BasicLayoutApplication: FunctionComponent<properties> = ({ pages }) => {

    const needLoginState:BooleanState = new BooleanState(useState(true));
    const appState:AppStateData = Context.appStateData;

    useEffect(() => {
        Context.appStateData.userState = needLoginState;
    }, [needLoginState])


    const [gotSchema, setGotSchema] = useState<boolean>(DataSchema.gotScheme());
    if (!needLoginState.getValue() && !DataSchema.gotScheme()) {
        DataSchema.getSchema(setGotSchema);
    }

    let screen;

    if (needLoginState.getValue()) {
        screen = <LoginPage />;
    } else {
        if (!gotSchema) screen = <>Загрузка настроек...</>;
        else screen = <ApplicationPage pages={pages} />
    }

    return (screen)
}
