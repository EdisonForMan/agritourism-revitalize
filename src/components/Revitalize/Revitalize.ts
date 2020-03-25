/* eslint-disable */
export interface labelValue {
    label: string;
    value: string;
    doVal: (value: string) => void
}
export function doHello<T>(context: any, n: T): void {
    context.extra = n;
}