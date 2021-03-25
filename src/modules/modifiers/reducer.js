import {List, fromJS, Map} from 'immutable'
import * as Actions from './constants'

const initState = fromJS({
    loading:  false,
    error: '',
    modifiers: List(),
    selected: Map(),
})

export default function modifierReducer(state=initState, action){
    const {type, payload, error} = action
    switch (type){
        case Actions.SET_SELECTED:
            return state.set('selected', fromJS(payload))
        case Actions.REMOVE_SELECTED:
            return state.set('selected', initState.get('selected'))
        case Actions.LIST_MODIFIERS:
            return state.set('loading', true)
        case Actions.LIST_MODIFIERS_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.LIST_MODIFIERS_SUCCESS:
            return state.set('loading', false).set('error', '').set('modifiers', fromJS(payload))
        
        case Actions.ADD_MODIFIERS:
            return state.set('loading', true)
        case Actions.ADD_MODIFIERS_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.ADD_MODIFIERS_SUCCESS:
            return state.set('loading', false).set('error', '')
        
        case Actions.DELETE_MODIFIERS:
            return state.set('loading', true)
        case Actions.DELETE_MODIFIERS_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.DELETE_MODIFIERS_SUCCESS:
            return state.set('loading', false).set('error', '')

        case Actions.UPDATE_MODIFIERS:
            return state.set('loading', true)
        case Actions.UPDATE_MODIFIERS_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.UPDATE_MODIFIERS_SUCCESS:
            return state.set('loading', false).set('error', '')

        case Actions.DETAIL_MODIFIERS:
            return state.set('laoding', true)
        case Actions.DETAIL_MODIFIERS_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.DETAIL_MODIFIERS_SUCCESS:
            return state.set('loading', false).set('nowModifier', fromJS(payload))
        default:
            return state
    }
}