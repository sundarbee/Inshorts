import {createStore, applyMiddleware, combineReducers, compose } from 'redux'
import {AsyncStorage} from 'react-native'
import reducer from '../reducers'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'
import initialState from '../reducers/initialstate'
import { composeWithDevTools } from 'redux-devtools-extension';




const loggerMiddleware = createLogger({ predicate: (getState, action) => _DEV_ });

function configureStore(initialState){
  AsyncStorage.getItem('store').then((value) => {
    if (value && value.length){
      initialState = JSON.parse(value)
      console.log('stored State::::' + initialState);
    }
  });

  

  const enhancer = compose(
    applyMiddleware(

    ), autoRehydrate({log:true})
  );
    return createStore(reducer, initialState, enhancer, window.devToolsExtension && window.devToolsExtension());

}

const store = configureStore(initialState)

persistStore(store,{storage: AsyncStorage}, () =>{
  console.log('restored');
})

export default store
