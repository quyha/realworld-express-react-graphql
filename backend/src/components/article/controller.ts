import { IContextRequest } from '@type/graphql';
import { authenticate } from '@utils/authentication';
import { IArgsArticles, ICreateArticle, IArticle } from './types';
import validator from '@utils/validator';
import { createArticleRules } from './validations';
import Article from './model';

export const getArticles = async (_: never, args: IArgsArticles, { token }: IContextRequest): Promise<any> => {
    // const user = await authenticate(token);
    // const { cursor, limit, authoredBy } = args;
    console.log(args, token);
};

export const createArticle = async (_: never, { input }: { input: ICreateArticle }, { token }: IContextRequest): Promise<IArticle> => {
    const user = await authenticate(token);
    await validator(createArticleRules, input);
    
    const newArticle = new Article(input);
    newArticle.author = user;
    const article = await newArticle.save();
    return article.toJSONFor(user.toProfileJSON());
};
