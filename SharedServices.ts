import NavigationState from "./navigation/NavigationState";
import Repository from "./data/backend/Repository";
import Class from "./reflection/Class";

export default class SharedServices {

    public static create():SharedServices {
        return new SharedServices();
    }

    public navigation?:NavigationState<any>;
    public repository?:Repository<any>;

    public withNavigation(navigation:NavigationState<any>):SharedServices {
        this.navigation = navigation;
        return this;
    }

    public withRepository(repository:Repository<any>):SharedServices {
        this.repository = repository;
        return this;
    }
}