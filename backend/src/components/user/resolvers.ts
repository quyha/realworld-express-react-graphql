import { register } from './controller';

const resolver = {
    Query: {
        users: (): number => 1,
    },
    Mutation: {
        register,
    },
};

export default resolver;
