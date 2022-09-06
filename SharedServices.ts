import NavigationState from "./navigation/NavigationState";
import Repository from "./data/backend/Repository";

export default class SharedServices {

    navigation?:NavigationState<any>;
    repository?:Repository<any>;
}