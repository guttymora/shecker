import { IValidationObject, IError } from './types';
import { validations } from './validations';

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

    if (!value) {
        errors.push({ [key]: 'Invalid key to be validated' });
        return errors;
    }

    for (const rule of rules.split('|')) {
        if (!rule || rule.length === 0) {
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

            if (!testValue(value, rule)) {
                errors.push({ [key]: `Did not passed rule: ${rule}` });
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
        if (!key) {
            errors.push({ [key]: 'Invalid key to be validated' });
            return errors;
        }

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