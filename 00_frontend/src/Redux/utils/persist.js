import { persistReducer } from 'redux-persist'
//import createEncryptor from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web





const persistConfig = (key,additionnalOptions) =>({
  key,
  storage,
  ...additionnalOptions
})


export const makeReducerPersist = (key,reducer,additionnalOptions={}) => persistReducer(persistConfig(key,additionnalOptions),reducer);

export { persistStore } from 'redux-persist'


/*

const reducer = persistReducer(
  {
    transforms: [encryptor]
  },
  baseReducer
)
*/
