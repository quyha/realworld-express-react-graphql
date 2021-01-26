import {
    register,
    login,
    getProfile,
    updateProfile,
    follow,
    unfollow,
} from './controller';

const resolver = {
    Query: {
        me: getProfile,
    },
    Mutation: {
        register,
        login,
        updateProfile,
        followUser: follow,
        unfollowUser: unfollow,
    },
};

export default resolver;
