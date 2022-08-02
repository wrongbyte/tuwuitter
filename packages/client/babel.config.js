const config = require('@tuwuitter/babel');

const customConfig = {
  ...config,
  presets: [...config.presets, ['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: [['relay', { schema: '../server/graphql/schema.graphql' }]],
};

module.exports = customConfig;
