function isObject(obj: unknown) {
    return typeof obj === 'object'
}

export function shallowEquals(compared: object, other: object) {
    if (!isObject(compared) && !isObject(other)) {
        return compared === other
    }
    if (isObject(compared) != isObject(other)) {
        return false
    }

    const keys = Object.keys(compared)
    if (keys.length !== Object.keys(other).length) {
        return false;
    }

    const comparedRecord = compared as Record<string | number | symbol, unknown>
    const otherRecord = other as Record<string | number | symbol, unknown>

    return keys.every(key => comparedRecord[key] === otherRecord[key])
}
