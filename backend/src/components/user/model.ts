import { model, Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, IUserAuthResponse, IUserResponse, IUserSignToken } from './types';

// Example
// interface UserDocument extends IUser, Document {
//     getImage: () => string,
//     toUsername: () => string,
// }

// Example
// interface UserModel extends Model<UserDocument> {
//     getBio: () => string,
// }

// Example
// schema.methods.getImage = function () {
//     return '1';
// }

// schema.statics.getBio = function () {
//     return '1';
// }

interface UserDocument extends IUser, Document {
    toAuthJSON: () => IUserAuthResponse,
    generateToken: () => string,
    toProfileJSON: () => IUserResponse,
}

interface UserModel extends Model<UserDocument> {}

const schema = new Schema<UserDocument, UserModel>({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: String,
    image: String,
    favorites: [ { type: Schema.Types.ObjectId, ref: 'Article' } ],
    followings: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
}, { timestamps: true });

schema.pre<UserDocument>('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

schema.methods.toAuthJSON = function () {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        accessToken: this.generateToken(),
    }
}

schema.methods.toProfileJSON = function () {
    const { _id, ...user } = this.toJSON();
    return { id: _id, ...user };
}

schema.methods.generateToken = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const user: IUserSignToken = {
        id: this._id,
        username: this.username,
    };

    return jwt.sign(user, process.env.JWT_SECRET ?? '', { expiresIn: '2h' });
}

const User = model<UserDocument, UserModel>('User', schema);

export default User;
