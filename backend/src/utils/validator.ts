import { Schema, CustomHelpers, ErrorReport } from 'joi';
import { UserInputError } from 'apollo-server';
import { Types } from 'mongoose';

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

export function validateId (value: string, helpers: CustomHelpers): string | ErrorReport {
    if (Types.ObjectId.isValid(value)) {
        return value;
    }
    return helpers.error('Invalid ID');
}

export default validator;
