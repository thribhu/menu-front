import {fromJS, List} from 'immutable';
import * as Actions from './constants';

const initState = fromJS({
    loading: false,
    error: '',
    options: List(),
    selectedOptions: List(),
    optionToEdit: '',
    sortedOptions: List()
})

export default function optionReducer(state=initState, action) {
    const {type, payload, error} = action
    switch (type) {
        case Actions.STATE_LOADING:
            return state.set('loading', !state.get('loading'))
        //add
        case Actions.ADD_OPTION:
            return state.set('loading', true).set('error', initState.get('error'))
        case Actions.ADD_OPTION_SUCCESS:
            return state.set('loading', false).set('options', fromJS(payload)).set('error', initState.get('error')) 
        case Actions.ADD_OPTION_SUCCESS:
            return state.set('loading', false).set('error', fromJS(error))
        //remove
        case Actions.REMOVE_OPTION:
            return state.set('loading', true).set('error', initState.get('error'));
        case Actions.REMOVE_OPTION_SUCCESS:
            return state.set('loading', false)
        case Actions.REMOVE_OPTION_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        //update
        case Actions.UPDATE_OPTION:
            return state.set('loading', true).set('error', initState.get('error'));
        case Actions.UPDATE_OPTION_SUCCESS:
            return state.set('loading', false)
        case Actions.UPDATE_OPTION_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        //list
        case Actions.LIST_OPTIONS:
            return state.set('loading', true).set('error', initState.get('error'));
        case Actions.LIST_OPTIONS_SUCCESS:
            return state.set('loading', false)
        case Actions.LIST_OPTIONS_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        default:
            return state
    } 
}