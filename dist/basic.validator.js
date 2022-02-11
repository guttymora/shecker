"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validations_1 = require("./validations");
const validate = (value, rules) => {
    const errors = [];
    if (!value) {
        errors.push({ [value]: 'Invalid value' });
        return errors;
    }
    for (const rule of rules.split('|')) {
        for (const [ruleRegex, testValue] of validations_1.validations.entries()) {
            if (!ruleRegex.test(rule)) {
                continue;
            }
            if (!testValue(value, rule)) {
                errors.push({ [value]: `Did not passed rule: ${rule}` });
            }
            break; // If rule exists and passed successfully, go to the next rule
        }
    }
    return errors.filter(error => error != null);
};
exports.validate = validate;
