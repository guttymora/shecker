import { DATE_REGEXES, DATE_VALID_FORMATS } from './constants';

const checkisString = (value: any): string | null => {
    if (!(typeof value === 'string')) {
        return 'Invalid type. Required: string';
    }

    return null;
}

const checkIsNumber = (value: any): string | null => {
    if (!(typeof value === 'number')) {
        return 'Invalid type. Required: number';
    }

    return null;
}

const checkIsBoolean = (value: any): string | null => {
    if (value === 1 || value === 0 || value === true || value === false) return null;

    return 'Invalid type. Required: boolean';
}

const checkIsArray = (value: any): string | null => {
    if (!(value instanceof Array)) {
        return 'Invalid type. Required: array';
    }

    return null;
}

const checkIsObject = (value: any): string | null => {
    if (!(value instanceof Object)) {
        return 'Invalid type. Required: object';
    }

    return null;
}

const checkIsDateInstance = (value: any): string | null => {
    if (!(value instanceof Date)) {
        return 'Invalid type. Required: date';
    }

    return null;
}

const checkDateFormat = (value: any, rule: string): string | null => {
    if (typeof value !== 'string') return 'Invalid type. Required: string';

    // Check if value meet one of the right formats
    const validDate = DATE_REGEXES.some(regex => regex.test(value));
    if (!validDate) return 'Invalid date';

    // Check if rule is well-formed
    let format: string | string[] = rule.split(':')[1];
    if (!format || format.trim() === '') return 'Invalid date format';

    switch (format) {
        case DATE_VALID_FORMATS.DD_MM_YYYY:
            value = value.split('-');
            value = `${value[2]}-${value[1]}-${value[0]}`;
            break;

        case DATE_VALID_FORMATS.DD__MM__YYYY:
            value = value.split('/');
            value = `${value[2]}/${value[1]}/${value[0]}`;
            break;

        case DATE_VALID_FORMATS.MM_DD_YYYY:
            value = value.split('-');
            value = `${value[2]}-${value[0]}-${value[1]}`;
            break;

        case DATE_VALID_FORMATS.MM__DD__YYYY:
            value = value.split('/');
            value = `${value[2]}/${value[0]}/${value[1]}`;
            break;

        case DATE_VALID_FORMATS.YYYY_MM_DD:
        case DATE_VALID_FORMATS.YYYY__MM__DD:
            break;

        default:
            return 'Invalid date format';
    }

    const date = new Date(value);
    if (!(date instanceof Date) || isNaN(date.getTime())) return 'Invalid date';

    return null;
}

const checkMin = (value: string | number | any[], rule: string): string | null => {
    const min = getNumberLimit(rule);
    if (!min) return `Invalid limit -> ${rule}`;

    if (typeof value === 'number') {
        if (value >= min) return null;

        return `Invalid size -> ${rule}}`;
    }

    if (typeof value === 'string' || value instanceof Array) {
        if (value.length >= min) return null;

        return `Invalid size -> ${rule}}`;
    }

    return 'Invalid value type';
}

const checkMax = (value: string | number | any[], rule: string): string | null => {
    const max = getNumberLimit(rule);
    if (!max) return `Invalid limit -> ${rule}`;

    if (typeof value === 'number') {
        if (value <= max) return null;

        return `Invalid size -> ${rule}`;
    }

    if (typeof value === 'string' || value instanceof Array) {
        if (value.length <= max) return null;

        return `Invalid size -> ${rule}`;
    }

    return 'Invalid value type';
}

const checkSize = (value: string | any[], rule: string): string | null => {
    const size = getNumberLimit(rule);
    if (!size)`Invalid size -> ${rule}`;

    if (typeof value === 'string' || value instanceof Array) {
        if (value.length === size) return null;

        return `Invalid size -> ${rule}`;
    }

    return 'Invalid value type';
}

const checkEquals = (value: number, rule: string): string | null => {
    const limit = getNumberLimit(rule);
    if (!limit)`Invalid size -> ${rule}`;

    if (typeof value === 'number') {
        if (value === limit) return null;

        return `Invalid size -> ${rule}`;
    }

    return 'Invalid value type';
}

const getNumberLimit = (rule: string): number | null => {
    const limit = parseInt(rule.split(':')[1]);

    if (!isNaN(limit)) return Number(limit);

    return null;
}

/**
 * All validatios expressed in a map where key is a regular expression
 * to check if the rule exists and, in that case, return a result of testing the incoming value
 */
const validations = new Map<any, (value: any, rule?: string) => string | null>();
validations.set(/^string$/, (value) => checkisString(value));
validations.set(/^number$/, (value) => checkIsNumber(value));
validations.set(/^boolean$/, (value) => checkIsBoolean(value));
validations.set(/^array$/, (value) => checkIsArray(value));
validations.set(/^object$/, (value) => checkIsObject(value));
validations.set(/^date$/, (value) => checkIsDateInstance(value));
validations.set(/^onlydate:/, (value, rule) => checkDateFormat(value, rule!));
validations.set(/^min:/, (value, rule) => checkMin(value, rule!));
validations.set(/^max:/, (value, rule) => checkMax(value, rule!));
validations.set(/^size:/, (value, rule) => checkSize(value, rule!));
validations.set(/^equals:/, (value, rule) => checkEquals(value, rule!));

export {
    validations
}