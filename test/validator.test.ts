import { validate } from '../src/index';

describe('Check validations for simple objects', () => {
    it('Should return one error because "id" attribute is required', () => {
        const object = {}
        const rules = { id: 'required' }

        expect(validate(object, rules)).toHaveLength(1);
    });

    it('Should return one error because "id" attribute type is wrong', () => {
        const object = { id: '1' }
        const rules = { id: 'required|number' }

        expect(validate(object, rules)).toHaveLength(1);
    });

    it('Should return one error because "name" attribute is required', () => {
        const object = {
            id: 1,
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'required|string|min:5', roles: 'array|min:1|max:4' }

        expect(validate(object, rules)).toHaveLength(1);
    });

    it('Should return one error because "role" attribute is an array', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: 'user'
        }
        const rules = { id: 'number', name: 'required|string|min:5', roles: 'array|min:1|max:4' }

        expect(validate(object, rules)).toHaveLength(1);
    });

    it('Should return two error because "role" and "user" attributes are required', () => {
        const object = { id: 1 }
        const rules = { id: 'number', name: 'required|string|min:5', roles: 'required|array|min:1|max:4' }

        expect(validate(object, rules)).toHaveLength(2);
    });

    it('Should return one error because "role" attribute length is lower', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'required|string|min:5', roles: 'required|array|min:3|max:4' }

        expect(validate(object, rules)).toHaveLength(1);
    });

    it('Should return one error because "role" attribute length is greater', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'required|string|min:5', roles: 'required|array|max:1' }

        expect(validate(object, rules)).toHaveLength(1);
    });

    it('Should return empty array because object has no errors', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'string|min:5', roles: 'array|min:1|max:4' }

        expect(validate(object, rules)).toStrictEqual([]);
    });
});