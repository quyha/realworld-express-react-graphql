import { getArticles, createArticle } from './controller';

const resolvers = {
    Query: {
        articles: getArticles,
    },
    Mutation: {
        createArticle,
    }
};

export default resolvers;
