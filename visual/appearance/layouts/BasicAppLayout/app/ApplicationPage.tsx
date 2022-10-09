import React, {FunctionComponent, useState} from 'react';
import {Header} from "../header/Header";
import {Aside} from "../aside/Aside";
import {Main} from "../main/Main";
import Page from "../../../../pages/Page";
import Pages from "../../../../pages/Pages";

interface properties {
    pages: Pages;
}

export const ApplicationPage: FunctionComponent<properties> = ({ pages }) => {

    const [currentSubMenuEntries, setCurrentSubMenuEntries] = useState<Page[]>(pages.getPagesList()[0].subPages.filter(sp => sp.isVisible))
    const [currentPage, setCurrentPage] = useState<Page>(pages.getPagesList()[0].defaultPage)


    const processMainMenuChoice = (page: Page):void => {
        setCurrentSubMenuEntries(page.subPages);
        setCurrentPage(page.defaultPage)
    }

    return <div className="App">

        <div className="MainApp">

            <Header pages={pages} />

            <div className="main-container">

                <Aside
                    pages={pages}
                    processMainMenuChoice={processMainMenuChoice}
                />

                <Main
                    currentSubMenuEntries={currentSubMenuEntries}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>

            {/*<div id="footer"></div>*/}

            {/*<footer className="App-footer">*/}
            {/*    Footer content*/}
            {/*</footer>*/}

        </div>

    </div>
}