import {List, fromJS, Map} from 'immutable'
import { isEmpty } from 'lodash-es'
import * as Actions from './constants'

const initState = fromJS({
    loading:  false,
    error: '',
    items: List(),
    selected: Map(),
    options_groups: List(),
    message: ''
})

export default function GroupReducer(state=initState, action){
    const {type, payload, error} = action
    switch (type){
        case Actions.LIST_ITEMS:
            return state.set('loading', true)
        case Actions.LIST_ITEMS_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.LIST_ITEMS_SUCCESS:
            if (isEmpty(payload)) {
                return state.set('loading', false).set('error', '').set('items', initState.get('items')).set('message', 'Add Items to view in table')
            }
            return state.set('loading', false).set('error', '').set('items', fromJS(payload)).set('message', '')
        
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
        case Actions.SET_SELECTED:
            return state.set('selected', fromJS(payload))
        case Actions.REMOVE_SELECTED:
            return state.set('selected', initState.get('selected'))


        case Actions.LIST_OPTIONS_GROUPS:
            return state.set('loading', true)
        case Actions.LIST_OPTIONS_GROUPS_SUCCESS: {
            if (isEmpty(payload)) {
                return state.set('loading', false).set('message', "Options and group are empty")
            }
            else {
                return state.set('loading', false).set('options_groups', fromJS(payload)).set('message', '')
            }
        }
        case Actions.LIST_OPTIONS_GROUPS_ERROR:
            return state.set('loading', false).set('error', fromJS(error) )
        default:
            return state
    }
}
