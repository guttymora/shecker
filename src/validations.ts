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