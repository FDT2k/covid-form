import { createStore,applyMiddleware, compose } from "redux";

export const defaultMiddlewaresList = () => {

    let	middlewares = [];

    let {default: ReduxThunk} = require("redux-thunk");

    let reduxMiddlewares = [...middlewares];

    if (process.env.NODE_ENV === "development") {
        const { logger } = require("redux-logger");
        reduxMiddlewares.push(logger);
    }

    reduxMiddlewares.push(ReduxThunk);
    return applyMiddleware(...reduxMiddlewares);

};

// build a store using middlewares, initialState and reducers
// here reducer is an object
export const makeStore = (setMiddleWares) => (initialState)=> (reducer) =>{
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    /*if(process.env.NODE_ENV === 'development'){
        const {composeWithDevTools} = require ('remote-redux-devtools');
        const enhance = composeWithDevTools({ hostname:"192.168.64.176",realtime: true, port: 8000,secure:true });
		setMiddleWares = enhance(setMiddleWares)
    }*/
    
    let store = createStore(reducer,initialState,composeEnhancers(setMiddleWares));

    return store;
};

// create a default store, with default middlewares

export default makeStore(defaultMiddlewaresList())
