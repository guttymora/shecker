import { IError } from './types';
import { validations } from './validations';

const validate = (value: any, rules: string): IError[] => {
    const errors: IError[] = [];

    if (!value) {
        errors.push({ [value]: 'Invalid value' });
        return errors;
    }
    
    for(const rule of rules.split('|')) {
        for (const [ruleRegex, testValue] of validations.entries()) {
            if (!(ruleRegex as RegExp).test(rule)) {
                continue;
            }

            if (!testValue(value, rule)) {
                errors.push({ [value]: `Did not passed rule: ${rule}` });
            }

            break; // If rule exists and passed successfully, go to the next rule
        }
    }

    return errors.filter(error => error != null);
}

export {
    validate
}