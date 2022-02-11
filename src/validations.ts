const checkRequire = (value: any): boolean => {
    if (value) return true;

    return false;
}

const checkisString = (value: any): boolean => {
    return typeof value === 'string';
}

const checkIsNumber = (value: any): boolean => {
    return typeof value === 'number';
}

const checkIsArray = (value: any): boolean => {
    return value instanceof Array;
}

const checkIsObject = (value: any): boolean => {
    return value instanceof Object;
}

const checkMin = (value: string | number | any[], rule: string) => {
    const min = getNumberLimit(rule);
    if (!min) return false;

    if (typeof value === 'number') {
        return value >= min;
    }

    return value.length >= min;
}

const checkMax = (value: string | number | any[], rule: string) => {
    const max = getNumberLimit(rule);
    if (!max) return false;

    if (typeof value === 'number') {
        return value <= max;
    }

    return value.length <= max;
}

const checkSize = (value: string | any[], rule: string) => {
    const size = getNumberLimit(rule);
    if (!size) return false;

    return value.length === size;
}

const checkEquals = (value: number, rule: string) => {
    const limit = getNumberLimit(rule);
    if (!limit) return false;

    return value === limit;
}

const getNumberLimit = (rule: string): number | null => {
    const limit = rule.split(':')[1];

    if (limit) return Number(limit);

    return null;
}

/**
 * All validatios expressed in a map where key is a regular expression
 * to check if the rule exists and, in that case, return a result of testing the incoming value
 */
const validations = new Map<any, (value: any, rule?: string) => boolean>();
validations.set(/required/, (value) => checkRequire(value));
validations.set(/string/, (value) => checkisString(value));
validations.set(/number/, (value) => checkIsNumber(value));
validations.set(/array/, (value) => checkIsArray(value));
validations.set(/object/, (value) => checkIsObject(value));
validations.set(/^min:/, (value, rule) => checkMin(value, rule!));
validations.set(/^max:/, (value, rule) => checkMax(value, rule!));
validations.set(/^size:/, (value, rule) => checkSize(value, rule!));
validations.set(/^equals:/, (value, rule) => checkEquals(value, rule!));

export {
    validations
}