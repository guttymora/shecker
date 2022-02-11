import { validateObject } from '../src/index';

describe('Check validations for simple objects', () => {
    it('Should return one error because "id" attribute is required', () => {
        const object = {}
        const rules = { id: 'required' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because rule is empty', () => {
        const object = {}
        const rules = { id: '' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because rule is malformed', () => {
        const object = {}
        const rules = { id: {} as string }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because "id" attribute type is wrong', () => {
        const object = { id: '1' }
        const rules = { id: 'required|number' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because "name" attribute is required', () => {
        const object = {
            id: 1,
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'required|string|min:5', roles: 'array|min:1|max:4' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because "role" attribute is an array', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: 'user'
        }
        const rules = { id: 'number', name: 'required|string|min:5', roles: 'array|min:1|max:4' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return two error because "role" and "user" attributes are required', () => {
        const object = { id: 1 }
        const rules = { id: 'number', name: 'required|string|min:5', roles: 'required|array|min:1|max:4' }

        expect(validateObject(object, rules)).toHaveLength(2);
    });

    it('Should return one error because "role" attribute length is lower', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'string|min:5', roles: 'required|array|min:3|max:4' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because "role" attribute length is greater', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'string|min:5|required', roles: 'required|array|max:1' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because rule is malformed', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: '|string|min:5|required' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because rules: required & ifExists are defined for the same attribute', () => {
        const object = {
            id: 1,
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'string|min:5|required|ifExists', roles: 'array|min:1|max:4' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return empty array because there is no errors', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'string|min:5', roles: 'array|min:1|max:4' }

        expect(validateObject(object, rules)).toStrictEqual([]);
    });

    it('Should return empty array because attribute `name` is optional (ifExists)', () => {
        const object = {
            id: 1,
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', name: 'string|min:5|ifExists', roles: 'array|min:1|max:4' }

        expect(validateObject(object, rules)).toStrictEqual([]);
    });
});

describe('Check validations for nested objects', () => {
    it('Should return one error because property name.first does not exist', () => {
        const object = {
            id: 1,
            name: 'Gustavo Mora',
            roles: ['user', 'admin']
        }
        const rules = { 'name.first': 'string|min:5' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because property name.last does not exist', () => {
        const object = {
            id: 1,
            name: { first: 'Gustavo' },
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', 'name.first': 'string|min:3', 'name.last': 'required' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return an empty array because there is no errors', () => {
        const object = {
            id: 1,
            name: { first: 'Gustavo', last: 'Mora' },
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', 'name.first': 'string|min:3', 'name.last': 'required|string|min:3' }

        expect(validateObject(object, rules)).toStrictEqual([]);
    });
});