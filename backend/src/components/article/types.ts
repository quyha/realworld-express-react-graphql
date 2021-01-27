import { IUserResponse } from '@components/user/types';

export interface IArticle {
    id: string,
    title: string,
    description: string,
    body: string,
    slug: string,
    favoritesCount: number,
    comments: string[],
    tags: string[],
    author: IUserResponse,
    createdAt: string,
    updatedAt: string,
}

export interface IArgsArticles {
    cursor: string,
    limit: number,
    tags: string[],
    authoredBy: string,
}

export interface ICreateArticle extends Pick<IArticle, 'title' | 'description' | 'body' | 'tags'> {}
