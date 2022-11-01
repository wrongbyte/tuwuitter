import mongoose, { Document, Types } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

export interface LikeDocumentInterface extends Document {
  user: Types.ObjectId;
  tweet?: Types.ObjectId;
}

const LikeSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  tweet: {
    type: ObjectId,
    ref: 'Tweet',
    index: true,
  },
});

export const LikeModel = mongoose.model<LikeDocumentInterface>(
  'Like',
  LikeSchema
);
