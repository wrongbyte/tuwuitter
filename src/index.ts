import app from './server';
import { connectDatabase } from './config/database';

const init = async () => {
  try {
    connectDatabase();
  } catch (error) {
    console.log('Error in database connection:', error);
    process.exit(1);
  }
  app.listen(3005);
};

init();
