export interface IUser {
    username: string,
    email: string,
    password: string,
    bio: string,
    image: string,
    favorites: string[],
    followings: string[],
}

export interface IUserAuthResponse extends Pick<IUser, 'username' | 'email' | 'image'> {
    id: string,
    accessToken: string,
}

export interface IUserResponse extends IUser {
    id: string,
}

export interface IUserSignToken {
    id: string,
    username: string,
}

export interface IUserRegisterInput {
    username: string,
    email: string,
    password: string,
}
