import { validate } from '../src/index';

describe('Check validations for single values', () => {
    it('Should return one error because value is invalid', () => {
        const errors = validate('', 'string');

        expect(errors).toHaveLength(1);
    })
});