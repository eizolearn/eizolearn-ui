function isObject(obj: unknown) {
    return typeof obj === 'object'
}

export function shallowEquals(first: object, second: object) {
    if (!isObject(first) && !isObject(second)) {
        return first === second
    }
    if (isObject(first) != isObject(second)) {
        return false
    }

    const keys = Object.keys(first)
    if (keys.length !== Object.keys(second).length) {
        return false;
    }

    const comparedRecord = first as Record<string | number | symbol, unknown>
    const otherRecord = second as Record<string | number | symbol, unknown>

    return keys.every(key => comparedRecord[key] === otherRecord[key])
}
