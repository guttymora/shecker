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

    it('Should return one error because value (birthDate) is not a date', () => {
        const object = {
            name: 'Alex',
            birthDate: '45'
        }

        const rules = { birthDate: 'date' };

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because attribute birthDate is an invalid date', () => {
        const object = {
            name: 'Alex',
            birthDate: '45/45/2020'
        }

        const rules = { birthDate: 'onlydate:mm/dd/yyyy' };

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because `onlydate` rule is malformed', () => {
        const object = {
            name: 'Alex',
            birthDate: '45/45/2020'
        }

        const rules = { birthDate: 'onlydate:mmm/d/yyy' };

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because the format attribute birthDate is invalid', () => {
        const object = {
            name: 'Alex',
            birthDate: '80/2001/01'
        }

        const rules = { birthDate: 'onlydate:mm/dd/yyyy' };

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because attribute hasChildren is not a boolean', () => {
        const object = {
            name: 'Alex',
            hasChildren: 'yes',
            birthDate: '80/2001/01'
        }

        const rules = { name: 'string', hasChildren: 'boolean' };

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because attribute hasChildren is not a boolean', () => {
        const object = {
            name: 'Alex',
            hasChildren: 2,
            birthDate: '80/2001/01'
        }

        const rules = { name: 'string', hasChildren: 'boolean' };

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because attribute hasChildren is not a boolean', () => {
        const object = {
            name: 'Alex',
            hasChildren: [8],
            birthDate: '80/2001/01'
        }

        const rules = { name: 'string', hasChildren: 'boolean' };

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because email is invalid', () => {
        const object = {
            name: 'Alex',
            email: 'alex@sanz',
            birthDate: '80/2001/01'
        }

        const rules = { name: 'string', hasChildren: 'boolean' };

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

    it.only('Should return no errors', () => {
        const object = {
            name: 'Alex',
            childrenCount: 0
        }

        const rules = { name: 'string|min:2', childrenCount: 'number|min:0' };

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

    it('Should return no errors', () => {
        const object = {
            name: 'Alex',
            birthDate: '12/01/1990'
        }

        const rules = { name: 'string|required|min:3', birthDate: 'onlydate:mm/dd/yyyy' };

        expect(validateObject(object, rules)).toStrictEqual([]);
    });

    it('Should return no errors', () => {
        const object = {
            name: 'Alex',
            email: 'alex@sanz.com',
            birthDate: '12/01/1990'
        }

        const rules = { name: 'string|required|min:3', birthDate: 'onlydate:mm/dd/yyyy' };

        expect(validateObject(object, rules)).toStrictEqual([]);
    });
});

describe('Check validations for nested objects', () => {
    it('Should return one error because property name.first does not exist', () => {
        const object = {
            id: 1,
            name: 'Alex Black',
            roles: ['user', 'admin']
        }
        const rules = { 'name.first': 'string|min:5' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return one error because property name.last does not exist', () => {
        const object = {
            id: 1,
            name: { first: 'Alex' },
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', 'name.first': 'string|min:3', 'name.last': 'required' }

        expect(validateObject(object, rules)).toHaveLength(1);
    });

    it('Should return an empty array because there is no errors', () => {
        const object = {
            id: 1,
            name: { first: 'Alex', last: 'Black' },
            roles: ['user', 'admin']
        }
        const rules = { id: 'number', 'name.first': 'string|min:3', 'name.last': 'required|string|min:3' }

        expect(validateObject(object, rules)).toStrictEqual([]);
    });

    it('Should return an empty array because there is no errors', () => {
        const object = {
            id: 1,
            employee: {
                name: 'Alex',
                last: 'Black',
                age: 30,
                birthDate: '31-01-1992'
            }
        }
        const rules = {
            id: 'number', 'employee.name': 'string|min:3',
            'employee.age': 'number|min:18', 'employee.birthDate': 'onlydate:dd-mm-yyyy'
        };

        expect(validateObject(object, rules)).toStrictEqual([]);
    });
});
