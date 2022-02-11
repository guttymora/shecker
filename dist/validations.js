"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validations = void 0;
const checkRequire = (value) => {
    if (value)
        return true;
    return false;
};
const checkisString = (value) => {
    return typeof value === 'string';
};
const checkIsNumber = (value) => {
    return typeof value === 'number';
};
const checkIsArray = (value) => {
    return value instanceof Array;
};
const checkIsObject = (value) => {
    return value instanceof Object;
};
const checkMin = (value, rule) => {
    const min = getNumberLimit(rule);
    if (!min)
        return false;
    if (typeof value === 'number') {
        return value >= min;
    }
    return value.length >= min;
};
const checkMax = (value, rule) => {
    const max = getNumberLimit(rule);
    if (!max)
        return false;
    if (typeof value === 'number') {
        return value <= max;
    }
    return value.length <= max;
};
const checkSize = (value, rule) => {
    const size = getNumberLimit(rule);
    if (!size)
        return false;
    return value.length === size;
};
const checkEquals = (value, rule) => {
    const limit = getNumberLimit(rule);
    if (!limit)
        return false;
    return value === limit;
};
const getNumberLimit = (rule) => {
    const limit = rule.split(':')[1];
    if (limit)
        return Number(limit);
    return null;
};
/**
 * All validatios expressed in a map where key is a regular expression
 * to check if the rule exists and, in that case, return a result of testing the incoming value
 */
const validations = new Map();
exports.validations = validations;
validations.set(/required/, (value) => checkRequire(value));
validations.set(/string/, (value) => checkisString(value));
validations.set(/number/, (value) => checkIsNumber(value));
validations.set(/array/, (value) => checkIsArray(value));
validations.set(/object/, (value) => checkIsObject(value));
validations.set(/^min:/, (value, rule) => checkMin(value, rule));
validations.set(/^max:/, (value, rule) => checkMax(value, rule));
validations.set(/^size:/, (value, rule) => checkSize(value, rule));
validations.set(/^equals:/, (value, rule) => checkEquals(value, rule));
