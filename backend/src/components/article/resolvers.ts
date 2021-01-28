import {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    favoriteArticle,
    unfavoriteArticle,
} from './controller';

const resolvers = {
    Query: {
        articles: getArticles,
    },
    Mutation: {
        createArticle,
        updateArticle,
        deleteArticle,
        favoriteArticle,
        unfavoriteArticle,
    }
};

export default resolvers;
