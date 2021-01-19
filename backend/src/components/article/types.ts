export interface IArticle {
    title: string,
    description: string,
    body: string,
    slug: string,
    favoritesCount: number,
    comments: string[],
    tagList: string[],
    author: string,
}
