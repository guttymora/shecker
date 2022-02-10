import {IValidationObject, IError} from './types';
import { validations } from './validations';

const validateObject = (data: any, validation: IValidationObject): IError[] => {
    const errors: IError[] = [];

    // Iterate each key of validation object
    for (const key in validation) {
        const ruleObject = validation[key]; // Get rule for each attribute

        for (const rule of ruleObject.split('|')) {
            if (!rule || rule.length === 0) {
                errors.push({ [key]: 'Invalid rule format. Found an empty rule' });
                continue;
            }

            let validationPassed = false;
            let ruleExists = false;

            for (const [ruleRegex, testValue] of validations.entries()) {
                ruleExists = (ruleRegex as RegExp).test(rule);

                if (!ruleExists) {
                    continue;
                }

                validationPassed = testValue(data[key], rule);

                if (!validationPassed) {
                    errors.push({ [key]: `Did not passed rule: ${rule}` });
                }

                break; // If rule exists and passed successfully, go to the next rule
            }

            // If rule does not exist, break and go to the next attribute
            if (!ruleExists) {
                errors.push({ [key]: `Invalid rule: '${rule}'` });
                break;
            }

            // If one rule is not passed, break and go to the next attribute
            if (!validationPassed) {
                break;
            }
        };
    }

    return errors.filter(error => error != null);
}

export {
    validateObject
}