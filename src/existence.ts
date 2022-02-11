const EXISTENCE_RULES = {
    REQUIRED: 'required',
    IF_EXISTS: 'ifExists'
};

const checkIsRequired = (value: any, rules: string[]): boolean => {
    if (!rules.includes(EXISTENCE_RULES.REQUIRED)) return true;

    if (rules.includes(EXISTENCE_RULES.REQUIRED) && typeof value === 'string' && value.trim() === '') return false;

    return rules.includes(EXISTENCE_RULES.REQUIRED) && value !== null && value !== undefined;
}

const checkIsOptional = (value: any, rules: string[]): boolean => {
    if (!rules.includes(EXISTENCE_RULES.IF_EXISTS)) return false;

    if (rules.includes(EXISTENCE_RULES.REQUIRED) && typeof value === 'string' && value.trim() === '') return true;

    return rules.includes(EXISTENCE_RULES.IF_EXISTS) && (value !== null || value !== undefined);
}

const checkIfContainsExistenceConflict = (rules: string[]): boolean => {
    return rules.includes(EXISTENCE_RULES.REQUIRED) && rules.includes(EXISTENCE_RULES.IF_EXISTS);
}

export {
    EXISTENCE_RULES,
    checkIsRequired,
    checkIsOptional,
    checkIfContainsExistenceConflict,
}