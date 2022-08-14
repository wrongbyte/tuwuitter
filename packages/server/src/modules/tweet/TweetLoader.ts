import { createLoader } from '@entria/graphql-mongo-helpers';
import { registerLoader } from '../../graphql/loaderRegister';

import { TweetModel } from './tweetModel';

const {
  Wrapper: Tweet,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: TweetModel,
  loaderName: 'TweetLoader',
});

export { getLoader, clearCache, load, loadAll };
export default Tweet;

registerLoader('TweetLoader', getLoader);
