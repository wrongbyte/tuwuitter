import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Tweet {
  id: string;
  author: Types.ObjectId;
  content: string;
  likedBy: string[];
  retweetedBy: string[];
  replies: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TweetDocumentInterface extends Tweet, Document {
  id: string;
}

const TweetSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likedBy: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    retweetedBy: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    replies: {
      type: [Schema.Types.ObjectId],
      ref: 'Tweet',
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

// tweet.update({_id: tweet._id}, {$addToSet: {likedBy: user}})

export const TweetModel = mongoose.model<TweetDocumentInterface>(
  'Tweet',
  TweetSchema
);
