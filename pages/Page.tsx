
export default class Page {

     static title = (title: string) => {
          return new Page(title);
     }

     readonly title: string;
     private _widget: JSX.Element | null;
     private readonly _subPages: Array<Page>;

     constructor(title: string) {
          this.title = title;
          this._widget = null;
          this._subPages = new Array<Page>();
     }

     withWidget(widget: JSX.Element) {
          this._widget = widget;
          return this;
     }

     withSubPage(page: Page) {
          this._subPages.push(page);
          return this;
     }

     get widget(): JSX.Element | null {
          return this._widget;
     }

     get subPages(): Page[] {
          return this._subPages;
     }

     get defaultPage(): Page {
          if (this._subPages.length > 0) {
               return this._subPages[0];
          } else {
               return this;
          }
     }
}