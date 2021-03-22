import {combineReducers} from 'redux'
import optionReducer from 'modules/options/reducer';
import modifierReducer from 'modules/modifiers/reducer'

const rootReducer = combineReducers({
    options: optionReducer,
    modifiers: modifierReducer
})

export default rootReducer