import mongoose, { Schema, Document } from 'mongoose';

export interface Tweet {
  id: string;
  author: string;
  content: string;
  likedBy: string[];
  retweetedBy: string[];
  replies: string[];
}

export interface TweetDocumentInterface extends Tweet, Document {
  id: string;
}

const TweetSchema = new Schema({
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
  // TODO: add timestamp
});

// tweet.update({_id: tweet._id}, {$addToSet: {likedBy: user}})

export const TweetModel = mongoose.model<TweetDocumentInterface>(
  'Tweet',
  TweetSchema
);
