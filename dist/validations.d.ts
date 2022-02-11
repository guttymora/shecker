/**
 * All validatios expressed in a map where key is a regular expression
 * to check if the rule exists and, in that case, return a result of testing the incoming value
 */
declare const validations: Map<any, (value: any, rule?: string | undefined) => boolean>;
export { validations };
