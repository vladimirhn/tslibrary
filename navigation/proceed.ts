
export default function proceed(arr:Array<any>, destination:any):(arr: any) => any[] {
    return arr => [...arr, destination];
}