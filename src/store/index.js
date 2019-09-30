import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';
import persisReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleWare = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleWare];

const store = createStore(persisReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleWare.run(rootSaga);

export { store, persistor };
