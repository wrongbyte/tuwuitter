import app from './server';
import { connectDatabase } from './config/database';
import { PORT } from './config/environment';
import validateEnv from './utils/validateEnv';

validateEnv();

const init = async () => {
  try {
    connectDatabase();
  } catch (error) {
    console.log('Error in database connection:', error);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

init();
