module.exports = {
    toJson
}

function toJson(o) {
    if ('undefined' === typeof o) {
        return o
    }

    if (Array.isArray(o)) {
        return o.map(toJson)
    }

    const obj = 'function' === typeof o.toJSON ? o.toJSON() : o

    return JSON.parse(JSON.stringify(obj))
}
