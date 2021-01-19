import validator from '@utils/validator';
import { userRegisterRules } from './validations';
import { IUserRegisterInput, IUserAuthResponse } from './types';
import User from './model';

export const register = async (_: never, { input }: { input: IUserRegisterInput }): Promise<IUserAuthResponse> => {
    await validator(userRegisterRules, input);
    const newUser = new User(input);
    const user = await newUser.save();

    return user.toAuthJSON();
};
