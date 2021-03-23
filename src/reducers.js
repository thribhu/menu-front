import {combineReducers} from 'redux'
import optionReducer from 'modules/options/reducer';
import modifierReducer from 'modules/modifiers/reducer'
import itemReducer from 'modules/items/reducer'
import groupReducer from 'modules/groups/reducer'
const rootReducer = combineReducers({
    options: optionReducer,
    modifiers: modifierReducer,
    items: itemReducer,
    groups: groupReducer
})

export default rootReducer