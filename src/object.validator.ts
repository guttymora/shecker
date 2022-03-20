import { IValidationObject, IError } from './types';
import { validations } from './validations';
import { PRESENCE_RULES, checkIsRequired, checkIsOptional, checkIfContainsExistenceConflict } from './presence';

const isValidNested = (key: string): IError[] => {
    const list = key.split('.');

    if (list.length === 1) {
        if (!list[0]) {
            return [{ [key]: 'Invalid key to be validated' }];
        } else {
            return [];
        }
    }

    for (const el of list) {
        if (!el) return [{ [key]: 'Invalid key to be validated' }];
    }

    return [];
}

const testNestedAttribute = (object: any, nestedKey: string, rules: string): IError[] => {
    let errors: IError[] = [];

    errors = isValidNested(nestedKey);
    if (errors.length > 0) return errors;

    const listOfKeys = nestedKey.split('.');
    let nestedValue = { ...object };
    for (const key of listOfKeys) {
        if (!nestedValue[key]) {
            errors.push({ [nestedKey]: 'Nested attribute does not exists in object' });
            return errors;
        }

        nestedValue = nestedValue[key];
    }

    errors = errors.concat(testRule(nestedKey, nestedValue, rules));

    return errors;
}

const testRule = (key: string, value: any, rules: string): IError[] => {
    let errors: IError[] = [];

    let setOfRules = rules.toString().split('|');

    // Cannot exist 'required' & 'ifExists' rules for the same value
    if (checkIfContainsExistenceConflict(setOfRules)) {
        errors.push({ [key]: 'Existence conflict: required & ifExists rules' });
        return errors;
    }

    // If value not exists, omits the others validations
    if (checkIsOptional(value, setOfRules)) {
        return errors;
    }

    // If value is required send error and omit the others validations
    if (!checkIsRequired(value, setOfRules)) {
        errors.push({ [key]: 'Key does not exist' });
        return errors;
    }

    if (!value) {
        errors.push({ [key]: 'Attribute does not exist' });
        return errors;
    }

    // Remove rules: required & ifExists
    setOfRules = setOfRules.filter(rule => rule !== PRESENCE_RULES.IF_EXISTS && rule !== PRESENCE_RULES.REQUIRED);

    // If there is no more rules, skip
    if (setOfRules.length === 0) {
        return errors;
    }

    for (const rule of setOfRules) {
        if (!rule || rule.length === 0 || typeof rule !== 'string') {
            errors.push({ [key]: 'Invalid rule format. Found an empty rule' });
            continue;
        }

        let ruleExists = false;
        for (const [ruleRegex, testValue] of validations.entries()) {
            if (!(ruleRegex as RegExp).test(rule)) {
                continue;
            } else {
                ruleExists = true;
            }

            const testResult = testValue(value, rule);
            if (testResult) {
                errors.push({ [key]: testResult });
            }

            break; // If rule exists and passed successfully, go to the next rule
        }

        if (!ruleExists) {
            errors.push({ [key]: `Invalid rule: '${rule}'` });
        }
    }

    return errors;
}

const validateObject = (data: any, validation: IValidationObject): IError[] => {
    let errors: IError[] = [];

    // Iterate each key of validation object
    for (const key in validation) {
        const rules = validation[key];

        if (key.indexOf('.') !== -1) {
            errors = errors.concat(testNestedAttribute(data, key, rules));
        } else {
            errors = errors.concat(testRule(key, data[key], rules));
        }
    }

    return errors.filter(error => error != null);
}

export {
    validateObject
}