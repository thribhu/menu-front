import {List, fromJS, Map} from 'immutable'
import * as Actions from './constants'

const initState = fromJS({
    loading:  false,
    error: '',
    items: List(),
    selected: List(),
    nowItem: Map()
})

export default function GroupReducer(state=initState, action){
    const {type, payload, error} = action
    switch (type){
        case Actions.LIST_ITEMS:
            return state.set('loading', true)
        case Actions.LIST_ITEMS_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.LIST_ITEMS_SUCCESS:
            return state.set('loading', false).set('error', '').set('items', fromJS(payload))
        
        case Actions.ADD_ITEM:
            return state.set('loading', true)
        case Actions.ADD_ITEM_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.ADD_ITEM_SUCCESS:
            return state.set('loading', false).set('error', '')
        
        case Actions.REMOVE_ITEM:
            return state.set('loading', true)
        case Actions.REMOVE_ITEM_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.REMOVE_ITEM_SUCCESS:
            return state.set('loading', false).set('error', '')

        case Actions.UPDATE_ITEM:
            return state.set('loading', true)
        case Actions.UPDATE_ITEM_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.UPDATE_ITEM_SUCCESS:
            return state.set('loading', false).set('error', '')

        case Actions.DETAIL_ITEM:
            return state.set('laoding', true)
        case Actions.DETAIL_ITEM_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.DETAIL_ITEM_SUCCESS:
            return state.set('loading', false).set('nowModifier', fromJS(payload))
        default:
            return state
    }
}