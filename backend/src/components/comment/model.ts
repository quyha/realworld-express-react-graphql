import { model, Schema, Document, Model } from 'mongoose';
import { IComment } from './types';

interface CommentDocument extends IComment, Document {}

interface CommentModel extends Model<CommentDocument> {}

const schema = new Schema<CommentDocument, CommentModel>({
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
    },
}, { timestamps: true });

const Comment = model<CommentDocument, CommentModel>('Comment', schema);

export default Comment;
