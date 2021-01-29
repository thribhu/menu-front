import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers';
//import rootSaga from './sagas';
import immutableTransform from 'redux-persist-transform-immutable';

const persistConfig = {
    key: 'root',
    storage,
    transforms: [immutableTransform()],
    whitelist:  [""]
}
const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools({ realtime: true }) : compose;
// persisting the reducer and creating a reference to saga instance 
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();


export default () => {
    const enhancer = composeEnhancers(applyMiddleware());

    const store =  createStore(persistedReducer, enhancer);
    const  persistor = persistStore(store);
    
    //run saga middleware
//    sagaMiddleware.run(rootSaga);
    return {store, persistor};
}
