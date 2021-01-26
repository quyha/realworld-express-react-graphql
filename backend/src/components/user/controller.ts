import { UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import validator from '@utils/validator';
import { authenticate } from '@utils/authentication';
import { IContextRequest } from '@type/graphql';
import { userRegisterRules, userLoginRules, userUpdateRules, userFollowRules } from './validations';
import { IUserRegisterInput, IUserAuthResponse, IUserResponse, IUserUpdateInput } from './types';
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
    return user.toProfileJSON();
}

export const updateProfile = async (_: never, { input }: { input: IUserUpdateInput }, { token }: IContextRequest): Promise<IUserResponse> => {
    const user = await authenticate(token);
    await validator(userUpdateRules, input);
    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, input, { new: true, useFindAndModify: false });

    if (!updatedUser) {
        throw new UserInputError('Invalid User');
    }
    return updatedUser.toProfileJSON();
}

export const follow = async (_: never, { id }: { id: string }, { token }: IContextRequest): Promise<IUserResponse> => {
    const user = await authenticate(token);
    await validator(userFollowRules, { id });
    if (user.followings.includes(id) || user._id.toString() === id) {
        return user.toProfileJSON();
    }
    
    user.followings.push(id);
    const updatedUser = await user.save();
    return updatedUser.toProfileJSON();
}

export const unfollow = async (_: never, { id }: { id: string }, { token }: IContextRequest): Promise<IUserResponse> => {
    const user = await authenticate(token);
    await validator(userFollowRules, { id });
    if (!user.followings.includes(id)) {
        return user.toProfileJSON();
    }
    user.followings = user.followings.filter((value) => value.toString() !== id);
    const updatedUser = await user.save();
    return updatedUser.toProfileJSON();
}
