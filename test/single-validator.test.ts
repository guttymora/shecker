import { validate } from '../src/index';

describe('Check validations for single values', () => {
    it('Should return one error because value type is wrong', () => {
        const errors = validate('hello world', 'number');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because rule is malformed', () => {
        const errors = validate('hello world', 'number||');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because number is lower', () => {
        const errors = validate(1, 'number|min:2');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because number is different', () => {
        const errors = validate(8945135646, 'number|equals:2');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because array length exceed the limit', () => {
        const errors = validate([1, 2, 3, 4], 'array|min:2|max:3');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because array length does not reach the minimum limit', () => {
        const errors = validate([1, 2, 3, 4], 'array|min:5');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because value (string) is not a date type', () => {
        const errors = validate('date', 'date');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because value (number) is not a date type', () => {
        const errors = validate(12345, 'date');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because value (array) is not a date type', () => {
        const errors = validate([], 'date');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because date rule is invalid', () => {
        const errors = validate('02-02-2022', 'onlydate:mm-mm-yyyy');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because date is invalid: invalid month', () => {
        const errors = validate('13-02-1992', 'onlydate:mm-dd-yyyy');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because date is invalid: invalid day of month', () => {
        const errors = validate('02-45-2001', 'onlydate:mm-dd-yyyy');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because date is invalid: invalid year', () => {
        const errors = validate('02-45-1', 'onlydate:mm-dd-yyyy');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because date is invalid: invalid day of month', () => {
        const errors = validate('02-45-2010', 'onlydate:mm-dd-yyyy');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because value is not a boolean', () => {
        const errors = validate('2', 'boolean');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because value is not a boolean', () => {
        const errors = validate(45, 'boolean');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because value is not a boolean', () => {
        const errors = validate([33, 1], 'boolean');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because value is not a boolean', () => {
        const errors = validate({}, 'boolean');

        expect(errors).toHaveLength(1);
    });

    it('Should return one error because is an invalid email', () => {
        const errors = validate('', 'required|email');

        expect(errors).toHaveLength(1);
    });

    it('Should return no error because array value meets all the requirements', () => {
        const errors = validate([1, 2, 3, 4], 'array|min:1|max:4');

        expect(errors).toStrictEqual([]);
    });

    it('Should return empty array because value is optional (ifExists)', () => {
        const errors = validate('', 'ifExists|number');

        expect(errors).toStrictEqual([]);
    });

    it('Should return no errors: valid date object', () => {
        const errors = validate(new Date(), 'date');

        expect(errors).toStrictEqual([]);
    });

    it('Should return no errors: valid date string', () => {
        const errors = validate('24-12-2001', 'onlydate:dd-mm-yyyy');

        expect(errors).toStrictEqual([]);
    });

    it('Should return no errors: valid boolean', () => {
        const errors = validate(true, 'boolean');

        expect(errors).toStrictEqual([]);
    });

    it('Should return no errors: valid boolean', () => {
        const errors = validate(101 === 101, 'boolean');

        expect(errors).toStrictEqual([]);
    });

    it('Should return no error because is a valid email format', () => {
        const errors = validate('hello@world.com', 'required|email');

        expect(errors).toStrictEqual([]);
    });
});