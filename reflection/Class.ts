
export default interface Class<T> {
    [index: string]:any;
    new(...args: any[]): T;
}