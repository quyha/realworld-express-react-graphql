import { IContextRequest } from '@type/graphql';
import { authenticate } from '@utils/authentication';
import { IArgsArticles, ICreateArticle, IArticle, IArticlesConnection } from './types';
import validator from '@utils/validator';
import { createArticleRules, updateArticleRules, idArticleRules } from './validations';
import Article from './model';
import { toCursorHash, fromCursorHash } from '@utils/collection';

export const getArticles = async (_: never, args: IArgsArticles, { token }: IContextRequest): Promise<IArticlesConnection> => {
    const user = await authenticate(token);
    
    const { cursor, limit = 2 } = args;
    const filter = cursor ? { createdAt: { $lt: fromCursorHash(cursor) } } : {};
    
    const [ articles ] = await Promise.all([
        Article
            .find(filter)
            .limit(Number(limit) + 1)
            .sort({ createdAt: 'desc' }),
        // Article.countDocuments(filter),
    ]);
    
    const hasNextPage = articles.length > limit;
    const edges = hasNextPage ? articles.slice(0, -1) : articles;
    
    return {
        count: 0,
        edges: edges.map(article => article.toJSONFor(user.toProfileJSON())),
        pageInfo: {
            endCursor: edges.length > 0 ? toCursorHash(edges[edges.length - 1].createdAt) : '',
            hasNextPage,
        },
    };
};

export const createArticle = async (_: never, { input }: { input: ICreateArticle }, { token }: IContextRequest): Promise<IArticle> => {
    const user = await authenticate(token);
    await validator(createArticleRules, input);
    
    const newArticle = new Article(input);
    newArticle.author = user;
    const article = await newArticle.save();
    return article.toJSONFor(user.toProfileJSON());
};

export const updateArticle = async (
    _: never,
    { input, id }: { input: ICreateArticle, id: string },
    { token }: IContextRequest
): Promise<IArticle | undefined> => {
    const user = await authenticate(token);
    await validator(updateArticleRules, { id, ...input });
    const article = await Article.findOneAndUpdate({ _id: id }, input, { new: true, useFindAndModify: false });
    return article?.toJSONFor(user.toProfileJSON());
};

export const deleteArticle = async (_: never, { id }: { id: string }, { token }: IContextRequest): Promise<IArticle | undefined> => {
    const user = await authenticate(token);
    await validator(idArticleRules, { id });
    const article = await Article.findOneAndDelete({ _id: id });
    return article?.toJSONFor(user.toProfileJSON());
};

export const favoriteArticle = async (_: never, { id }: { id: string }, { token }: IContextRequest): Promise<IArticle | undefined> => {
    const user = await authenticate(token);
    await validator(idArticleRules, { id });
    const article = await Article.findById(id);
    const favoritesCount = article?.favoritesCount ?? 0;
    
    if (!user.favorites.includes(id) && article) {
        user.favorites.push(id);
        await user.save();
        article.favoritesCount = favoritesCount + 1;
        const updatedArticle = await article.save();
        return updatedArticle.toJSONFor(user.toProfileJSON());
    }

    return article?.toJSONFor(user.toProfileJSON());
};

export const unfavoriteArticle = async (_: never, { id }: { id: string }, { token }: IContextRequest): Promise<IArticle | undefined> => {
    const user = await authenticate(token);
    await validator(idArticleRules, { id });
    const article = await Article.findById(id);
    const favoritesCount = article?.favoritesCount ?? 0;
    
    if (user.favorites.includes(id) && article && favoritesCount > 0) {
        user.favorites = user.favorites.filter((value) => value.toString() !== id);
        await user.save();
        article.favoritesCount = favoritesCount - 1;
        const updatedArticle = await article.save();
        return updatedArticle.toJSONFor(user.toProfileJSON());
    }

    return article?.toJSONFor(user.toProfileJSON());
};
