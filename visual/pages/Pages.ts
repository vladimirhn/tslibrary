import Page from "./Page";

export default class Pages {

    private pages:Page[];

    constructor(pages:Page[]) {
        this.pages = pages;
    }

    public getPagesList():Page[] {
        return this.pages;
    }

    public hidePage(jsx:JSX.Element):boolean {
        const pages:Page[] = this.getPagesByJSX(jsx)
        const parentPage:Page = pages[0];
        const wantedPage:Page = pages[1];

        if (!wantedPage.isVisible) {
            return false;
        } else {
            wantedPage.isVisible = false;
            if (parentPage.subPages.filter(subPage => subPage.isVisible).length === 0) {
                parentPage.isVisible = false;
            }
            return true;
        }
    }

    public showPage(jsx:JSX.Element):boolean {
        const pages:Page[] = this.getPagesByJSX(jsx)
        const parentPage:Page = pages[0];
        const wantedPage:Page = pages[1];

        if (wantedPage.isVisible) {
            return false;
        } else {
            wantedPage.isVisible = true;
            if (!parentPage.isVisible) {
                parentPage.isVisible = true;
            }
            return true;
        }
    }

    private getPagesByJSX(jsx:JSX.Element):Page[] {
        let parentPage:Page | null = null;
        let wantedPage:Page | null = null;

        this.pages.forEach(parent => {
            parent.subPages.forEach(subPage => {
                if (subPage.widget?.type.name === jsx.type.name) {
                    parentPage = parent;
                    wantedPage = subPage;
                }
            })
        })
        if (parentPage !== null && wantedPage !== null) {
            return [parentPage, wantedPage];
        } else {
            throw new Error("JSX.Element " + jsx + " is not used as a page in project!")
        }
    }

    public clone():Pages {
        return new Pages(this.pages);
    }
}