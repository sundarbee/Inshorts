import createReducer from '../Network/createReducer'
import * as types from '../actions/types'
import {REHYDRATE} from 'redux-persist/constants'
import * as initialState from './initialstate'

export const sources = createReducer(null, {
  [types.SOURCE_OBJ](state, action){
    return action.payload;
  }
}
)
