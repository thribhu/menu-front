import {isImmutable} from 'immutable'
import { createSelector } from 'reselect'
import {orderBy} from 'lodash'
const items = state => state.items

export const loadingSelector = createSelector(
    items, 
    data => data.get('loading')
)

export const errorSelector = createSelector(
    items,
    data => {
        let error = data.get('error')
        if (isImmutable(error)){
            return error.toJS()
        }
        return error
    }
)

export const listSelector = createSelector(
    items,
    data => {
        let items = data.get('items')
        if(isImmutable(items)){
            return items.toJS()
        }
        return []
    }
)

export const selectedSelector = createSelector(
    items, 
    data => {
        let selected = data.get('selected')
        if(selected.size > 0 && isImmutable(selected)){
            return selected.toJS()
        }
        return []
    }
)

export const itemInfoSelector = createSelector(
    items,
    data => {
        return data.get('message')
    }
)

export const optionGroupsSelector = createSelector(
    items, 
    data => {
        var a = data.get('options_groups')
        if (a.size){
            return orderBy(a.toJS(), ['name'])
        }
        else return []
    }
)