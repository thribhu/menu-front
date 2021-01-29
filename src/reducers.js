import {combineReducers} from 'redux'
import optionReducer from 'modules/options/reducer';

export default function () {
    return {
        options: optionReducer
    }
}