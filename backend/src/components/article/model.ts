import { model, Schema, Document, Model } from 'mongoose';
import { IArticle } from './types';

interface ArticleDocument extends IArticle, Document {}

interface ArticleModel extends Model<ArticleDocument> {}

const schema = new Schema<ArticleDocument, ArticleModel>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    favoritesCount: {
        type: Number,
        default: 0,
    },
    comments: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ],
    tagList: [ { type: String } ],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Article = model<ArticleDocument, ArticleModel>('User', schema);

export default Article;
