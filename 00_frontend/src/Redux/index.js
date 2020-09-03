import createStore from './utils/redux-store';

import {combineReducers} from 'redux'

import {makeReducerPersist,persistStore} from './utils/persist'

import Configuration from 'Redux/Configuration';
import Keys from 'Redux/Keys';
import TrackerKit from 'Redux/TrackerKit';


const reducers =combineReducers({
  //configuration: makeReducerPersist('config',Configuration),
  //pgp: makeReducerPersist('pgp',Keys),
  //configuration: Configuration,$
  ecov: TrackerKit,
  pgp: Keys,
})


export const CreateStore = ()=>{
  let store     = createStore({})(reducers);
  let persistor = persistStore(store)
  return {
    store,persistor
  }
}
