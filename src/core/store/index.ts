import devStore from './configure.dev.store';
import prodStore from './configure.prod.store';

const configureStore = process.env.NODE_ENV === 'development' ? devStore : prodStore;

export { configureStore }
