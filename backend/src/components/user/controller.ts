import { UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import validator from '@utils/validator';
import { authenticate } from '@utils/authentication';
import { IContextRequest } from '@type/graphql';
import { userRegisterRules, userLoginRules } from './validations';
import { IUserRegisterInput, IUserAuthResponse, IUserResponse } from './types';
import User from './model';

export const register = async (_: never, { input }: { input: IUserRegisterInput }): Promise<IUserAuthResponse> => {
    await validator(userRegisterRules, input);
    const newUser = new User(input);
    const user = await newUser.save();

    return user.toAuthJSON();
};

export const login = async (_: never, { email, password }: { email: string, password: string }): Promise<IUserAuthResponse> => {
    await validator(userLoginRules, { email, password });
    const user = await User.findOne({ email });

    if (!user) {
        throw new UserInputError('Invalid Email')
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new UserInputError('Invalid Password');
    }

    return user.toAuthJSON();
};

export const getProfile = async (_: never, __: never, { token }: IContextRequest): Promise<IUserResponse> => {
    const user = await authenticate(token);
    return user;
}
