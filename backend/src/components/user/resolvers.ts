import { register, login, getProfile, updateProfile } from './controller';

const resolver = {
    Query: {
        me: getProfile,
    },
    Mutation: {
        register,
        login,
        updateProfile,
    },
};

export default resolver;
