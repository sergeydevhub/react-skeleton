import devStore from './configure.dev.store';
import prodStore from './configure.prod.store';
import * as browserStorage from './browser.storage';

const configureStore = process.env.NODE_ENV === 'development' ? devStore : prodStore;

export {
  configureStore,
  browserStorage
}
