import CookiesData from "./CookiesData";

type LoginResponseProcessor =

    (cookiesData: CookiesData) => void;

export default LoginResponseProcessor;