import createStore from './utils/redux-store';

import {combineReducers} from 'redux'

import {makeReducerPersist,persistStore} from './utils/persist'

import Configuration from 'Redux/Configuration';
import Keys from 'Redux/Keys';


const reducers =combineReducers({
  //configuration: makeReducerPersist('config',Configuration),
  //pgp: makeReducerPersist('pgp',Keys),
  configuration: Configuration,
  pgp: Keys,
})


export const CreateStore = ()=>{
  let store     = createStore({})(reducers);
  let persistor = persistStore(store)
  return {
    store,persistor
  }
}
