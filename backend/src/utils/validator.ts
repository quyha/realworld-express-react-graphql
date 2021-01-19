import { Schema } from 'joi';
import { UserInputError } from 'apollo-server';

async function validator (schema: Schema, payload: Record<string, any>): Promise<any> {
    const { value, error } = schema.validate(payload, { abortEarly: false });

    return await new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (error) {
            throw new UserInputError('Validation Errors', { errors: error.details });
        }
        return resolve(value);
    })
}

export default validator;
