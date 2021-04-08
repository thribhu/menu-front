import {List, fromJS, Map} from 'immutable'
import * as Actions from './constants'
import {isEmpty} from 'lodash'

const initState = fromJS({
    loading:  false,
    error: '',
    groups: List(),
    selected: Map(),
    nowGroup: Map(),
    message: ''
})

export default function GroupReducer(state=initState, action){
    const {type, payload, error} = action
    switch (type){
        case Actions.LIST_GROUPS:
            return state.set('loading', true)
        case Actions.LIST_GROUPS_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.LIST_GROUPS_SUCCESS:
            // add this logic to every module
            if (isEmpty(payload)) {
                return state.set('loading', false).set('error', '').set('message', 'Add Groups to view in the table')
            }
            return state.set('loading', false).set('error', '').set('groups', fromJS(payload)).set('message', '')
        
        case Actions.ADD_GROUP:
            return state.set('loading', true)
        case Actions.ADD_GROUP_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.ADD_GROUP_SUCCESS:
            return state.set('loading', false).set('error', '')
        
        case Actions.REMOVE_GROUP:
            return state.set('loading', true)
        case Actions.REMOVE_GROUP_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.REMOVE_GROUP_SUCCESS:
            return state.set('loading', false).set('error', '')

        case Actions.UPDATE_GROUP:
            return state.set('loading', true)
        case Actions.UPDATE_GROUP_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.UPDATE_GROUP_SUCCESS:
            return state.set('loading', false).set('error', '')

        case Actions.DETAIL_GROUP:
            return state.set('laoding', true)
        case Actions.DETAIL_GROUP_ERROR:
            return state.set('loading', false).set('error', fromJS(error))
        case Actions.DETAIL_GROUP_SUCCESS:
            return state.set('loading', false).set('nowModifier', fromJS(payload))
        case Actions.SET_SELECTED:
            return state.set('selected', fromJS(payload))
        case Actions.REMOVE_SELECTED:
            return state.set('selected', initState.get('selected'))
        default:
            return state
    }
}
