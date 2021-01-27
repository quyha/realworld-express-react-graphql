import { model, Schema, Document, Model } from 'mongoose';
import slug from 'slug';
import { IArticle } from './types';
import { IUserResponse } from '@components/user/types';
import { UserDocument } from '@components/user/model';

interface ArticleDocument extends Omit<IArticle, 'id' | 'author'>, Document {
    author: UserDocument,
    toJSONFor: (user: IUserResponse) => IArticle,
    slugify: () => void,
}

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
    tags: [ { type: String } ],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

schema.pre<ArticleDocument>('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
})

schema.methods.toJSONFor = function (user: IUserResponse) {
    return {
        id: this._id,
        title: this.title,
        description: this.description,
        body: this.body,
        slug: this.slug,
        favoritesCount: this.favoritesCount,
        comments: [],
        tags: this.tags,
        author: user,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

schema.methods.slugify = function () {
    this.slug = slug(`${ this.title }-${ (Math.random() * Math.pow(36, 6) | 0).toString(36) }`);
}

const Article = model<ArticleDocument, ArticleModel>('Article', schema);

export default Article;
