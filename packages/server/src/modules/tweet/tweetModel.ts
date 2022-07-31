import mongoose, { Schema } from 'mongoose';

export interface Tweet {
  author: string;
  content: string;
  likedBy: string[];
  retweetedBy: string[];
  replies: string[];
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
  },
  // TODO: add timestamp
});

// tweet.update({_id: tweet._id}, {$addToSet: {likedBy: user}})

export const TweetModel = mongoose.model('Tweet', TweetSchema);
