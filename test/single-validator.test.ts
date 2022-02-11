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

    it('Should return no error because array value meets all the requirements', () => {
        const errors = validate([1, 2, 3, 4], 'array|min:1|max:4');

        expect(errors).toStrictEqual([]);
    });

    it('Should return empty array because value is optional (ifExists)', () => {
        const errors = validate('', 'ifExists|number');

        expect(errors).toStrictEqual([]);
    });
});