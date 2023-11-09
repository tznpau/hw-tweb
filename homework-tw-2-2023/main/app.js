/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure  
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values){
    if (!isObject(input) || !isObject(values)) {
        throw new Error('InvalidType');
    }

    if (Object.keys(input).length === 0) {
        return '';
    }

    function tokenSubstitution(str) {
        const tokenRegex = /\${(.*?)}/g;
        return str.replace(tokenRegex, (match, token) => values[token] || match);
    }

    function substitution(obj) {
        if (typeof obj === 'string') {
            return tokenSubstitution(obj);
        } else if (isObject(obj)) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key] = substitution(obj[key]);
                }
            }
        }
        return obj;
    }

    const resultObj = substitution(input);

    function stringifyWithTags(obj) {
        if (typeof obj === 'string') {
            return obj;
        } else if (isObject(obj)) {
            const keys = Object.keys(obj);
            return keys.map((key) => `<${key}>${stringifyWithTags(obj[key])}</${key}>`).join('');
        }
        return '';
    }

    const resultStr = stringifyWithTags(resultObj); // obj -> string
    return resultStr;
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

// test simple case
const inputSimple = {
    a: 'some ${value}',
};

const valuesSimple = {
    value: 'thing',
};

const resultSimple = render(inputSimple, valuesSimple);
console.log(resultSimple); // <a>some thing</a>

// test complex case
const inputComplex = {
    a: {
        b: {
            c: 'content'
        },
        d: '${v1}'
    },
    c: {
        e: '${v2}'
    },
    
};

const valuesComplex = {
    v1: 'first',
    v2: 'second'
};

const resultComplex = render(inputComplex, valuesComplex);
console.log(resultComplex); // <a><b><c>content</c></b><d>first</d></a><c><e>second</e></c>

module.exports = {
    render,
    isObject
}