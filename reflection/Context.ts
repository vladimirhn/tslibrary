import UserStateData from "../visual/appearance/layouts/BasicAppLayout/login/UserStateData";
import PagesState from "../visual/pages/PagesState";

export default class Context {

    public static readonly userStateData:UserStateData = new UserStateData();
    public static pagesState:PagesState;
}