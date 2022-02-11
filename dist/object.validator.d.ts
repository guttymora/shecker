import { IValidationObject, IError } from './types';
declare const validateObject: (data: any, validation: IValidationObject) => IError[];
export { validateObject };
