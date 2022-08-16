import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  username: string;
  displayName?: string;
  email: string;
  password: string;
  tweets: Types.ObjectId[];
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
}

export interface UserDocumentInterface extends User, Document {
  id: string;
  tweets: Types.ObjectId[];
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
  hashPassword(password: string): Promise<string>;
  comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 12,
  },
  displayName: {
    type: String,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: 32,
    minlength: [8, 'Password must be more than 8 characters'],
    select: false,
  },
  tweets: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'Tweet',
  },
  following: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'User',
  },
  followers: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'User',
  },
});

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

UserSchema.pre<UserDocumentInterface>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassword = await this.hashPassword(this.password);
    this.password = hashedPassword;
  }

  return next();
});

UserSchema.methods = {
  hashPassword: async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  },

  comparePasswords: async (
    candidatePassword: string,
    hashedPassword: string
  ) => {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  },
};

export const UserModel = mongoose.model<UserDocumentInterface>(
  'User',
  UserSchema
);
