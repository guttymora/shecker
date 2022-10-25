const PRESENCE_RULES = {
    REQUIRED: 'required',
    IF_EXISTS: 'ifExists'
};

const checkIsRequired = (value: any, rules: string[]): boolean => {
    if (!rules.includes(PRESENCE_RULES.REQUIRED)) return true;

    if (rules.includes(PRESENCE_RULES.REQUIRED) && typeof value === 'string' && value.trim() === '') return false;

    return rules.includes(PRESENCE_RULES.REQUIRED) && value !== undefined && value !== null;
}

const checkIsOptional = (value: any, rules: string[]): boolean => {
    return rules.includes(PRESENCE_RULES.IF_EXISTS);
}

const checkIfContainsExistenceConflict = (rules: string[]): boolean => {
    return rules.includes(PRESENCE_RULES.REQUIRED) && rules.includes(PRESENCE_RULES.IF_EXISTS);
}

export {
    PRESENCE_RULES,
    checkIsRequired,
    checkIsOptional,
    checkIfContainsExistenceConflict,
}
