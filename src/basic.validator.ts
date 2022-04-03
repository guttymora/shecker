import { IError } from './types';
import { validations } from './validations';
import { PRESENCE_RULES, checkIsRequired, checkIsOptional, checkIfContainsExistenceConflict } from './presence';

const validate = (value: any, rules: string): IError[] => {
    const errors: IError[] = [];

    let setOfRules = rules.toString().split('|');

    // Cannot exist 'required' & 'ifExists' rules for the same value
    if (checkIfContainsExistenceConflict(setOfRules)) {
        errors.push({ [value]: 'Existence conflict: required & ifExists rules' });
        return errors;
    }

    // If value not exists, omits the others validations
    if (checkIsOptional(value, setOfRules)) {
        return errors;
    }

    // If value is required send error and omit the others validations
    if (!checkIsRequired(value, setOfRules)) {
        errors.push({ [value]: 'Key does not exist' });
        return errors;
    }

    // Remove rules: required & ifExists
    setOfRules = setOfRules.filter(rule => rule !== PRESENCE_RULES.IF_EXISTS && rule !== PRESENCE_RULES.REQUIRED);

    for (const rule of setOfRules) {
        for (const [ruleRegex, testValue] of validations.entries()) {
            if (!(ruleRegex as RegExp).test(rule)) {
                continue;
            }

            const testResult = testValue(value, rule);
            if (testResult) {
                errors.push({ [value]: testResult });
            }

            break; // If rule exists and passed successfully, go to the next rule
        }
    }

    return errors.filter(error => error != null);
}

export {
    validate
}