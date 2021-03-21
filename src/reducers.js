import {combineReducers} from 'redux'
import optionReducer from 'modules/options/reducer';

const rootReducer = combineReducers({
    options: optionReducer
})

export default rootReducer