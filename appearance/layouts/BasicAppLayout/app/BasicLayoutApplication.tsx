import './app.css';

import React, {FunctionComponent, useEffect, useState} from 'react';

import AppStateData from "../login/AppStateData";
import InnerEvents from "../../../../events/InnerEvents";
import innerEventEffect from "../../../../events/InnerEventEffect";
import {LoginPage} from "../login/LoginPage";
import {ApplicationPage} from "./ApplicationPage";
import Page from "../../../../pages/Page";
import Context from "../../../../reflection/Context";
import DataSchema from "../../../../data/schema/DataSchema";

interface properties {
    pages: Page[];
}

export const BasicLayoutApplication: FunctionComponent<properties> = ({ pages }) => {

    const [appStateData,] = useState<AppStateData>(Context.appStateData);
    const [, setUser] = useState<string>("");

    let updateUser = ():void => {
        setUser(appStateData.user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(innerEventEffect(InnerEvents.authRelatedActionPerformed, updateUser), []);


    const [gotSchema, setGotSchema] = useState<boolean>(DataSchema.gotScheme());
    if (!appStateData.needLogin() && !DataSchema.gotScheme()) {
        DataSchema.getSchema(setGotSchema);
    }

    let screen;

    if (appStateData.needLogin()) {
        screen = <LoginPage />;
    } else {
        if (!gotSchema) screen = <>Загрузка настроек...</>;
        else screen = <ApplicationPage pages={pages} />
    }

    return (screen)
}
