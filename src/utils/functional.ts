export function groupBy<T, K extends string | number>(xs: T[], keyFunction: (x: T) => K): { [_ in K]: T[] } {
    return xs.reduce((acc: { [_ in K]: T[] }, x: T) => {
        (acc[keyFunction(x)] = acc[keyFunction(x)] ?? []).push(x)
        return acc
    }, {} as { [_ in K]: T[] })
}

export function objectMap<V, V1>(
    x: { [_ in string]: V }, 
    transform: (key: string, value: V, index: number) => V1
): { [_ in string]: V1 } {
    return Object.fromEntries(
        Object.entries(x)
            .map(([key, value], index) => [key, transform(key, value, index)])
    )
}
