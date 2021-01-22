import { register, login, getProfile } from './controller';

const resolver = {
    Query: {
        me: getProfile,
    },
    Mutation: {
        register,
        login,
    },
};

export default resolver;
