import fs from 'fs/promises';
import path from 'path';
import { printSchema } from 'graphql/utilities';

import { schema } from '../graphql/schema';

const pwd = process.cwd();

const schemaFile = 'schema.graphql';

const generateSchema = async () => {
  try {
    const config = { schema, path: path.join(pwd, '../graphql', schemaFile) };
    await fs.writeFile(config.path, printSchema(config.schema));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

generateSchema();
