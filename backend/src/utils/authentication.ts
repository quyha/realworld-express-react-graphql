import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { IUserSignToken } from '@components/user/types';
import User, { UserDocument } from '@components/user/model';

async function authenticate (token: string): Promise<UserDocument> {
    if (!token) throw new AuthenticationError('You should provide a token!');

    const userSign: IUserSignToken = await new Promise((resolve) => {
        const decoded: unknown = jwt.verify(token, process.env.JWT_SECRET ?? '', (err, decoded) => {
            if (err) throw new AuthenticationError('Invalid token!');
            return decoded;
        });
        return resolve(decoded as IUserSignToken);
    });

    const user = await User.findById(userSign.id);

    if (!user) {
        throw new AuthenticationError('Invalid User');
    }
    
    return user;
}

export { authenticate };
