import React, {FunctionComponent, useState} from 'react';
import {Header} from "../header/Header";
import {Aside} from "../aside/Aside";
import {Main} from "../main/Main";
import Page from "../../../../pages/Page";

interface properties {
    pages: Page[];
}

export const ApplicationPage: FunctionComponent<properties> = ({ pages }) => {

    // const [menuSet, ] = useState<Page[]>(pages)
    const [currentSubMenuEntries, setCurrentSubMenuEntries] = useState<Page[]>(pages[0].subPages)
    const [currentPage, setCurrentPage] = useState<Page>(pages[0].defaultPage)


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