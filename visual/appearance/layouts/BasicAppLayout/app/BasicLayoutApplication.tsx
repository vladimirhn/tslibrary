import './app.css';

import React, {FunctionComponent, useEffect, useState} from 'react';

import {LoginPage} from "../login/LoginPage";
import {ApplicationPage} from "./ApplicationPage";
import Context from "../../../../../reflection/Context";
import DataSchema from "../../../../../data/schema/DataSchema";
import BooleanState from "../../../../../data/dataObject/vanila/BooleanState";
import PagesState from "../../../../pages/PagesState";
import Pages from "../../../../pages/Pages";

interface properties {
    pages: Pages;
}

export const BasicLayoutApplication: FunctionComponent<properties> = ({ pages }) => {

    const needLoginState:BooleanState = new BooleanState(useState(Context.userStateData.needLogin()));
    const pagesState:PagesState = new PagesState(useState(pages));

    useEffect(() => {
        Context.userStateData.userState = needLoginState;
        Context.pagesState = pagesState;
    }, [needLoginState, pagesState])


    const [gotSchema, setGotSchema] = useState<boolean>(DataSchema.gotScheme());
    if (!needLoginState.getValue() && !DataSchema.gotScheme()) {
        DataSchema.getSchema(setGotSchema);
    }

    let screen;

    if (needLoginState.getValue()) {
        screen = <LoginPage />;
    } else {
        if (!gotSchema) screen = <>Загрузка настроек...</>;
        else screen = <ApplicationPage pages={pagesState.getValue()} />
    }

    return (screen)
}
