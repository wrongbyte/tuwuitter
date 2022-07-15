import dotenv from 'dotenv';

dotenv.config();

export const { MONGO_URI, PORT } = process.env;
