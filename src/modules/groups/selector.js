import {createSelector} from 'reselect'
import {isImmutable} from 'immutable'
import _, { create } from 'lodash'

const groups = state => state.groups

export const loadingSelector = createSelector(
    groups, 
    data => data.get('loading')
)

export const errorSelector = createSelector(
    groups,
    data => {
        let error = data.get('error')
        if (isImmutable(error)){
            return error.toJS()
        }
        return error
    }
)

export const listSelector = createSelector(
    groups,
    data => {
        let groups = data.get('groups')
        if(isImmutable(groups)){
            return groups.toJS()
        }
        return []
    }
)

export const selectedSelector = createSelector(
    groups, 
    data => {
        let selected = data.get('selected')
        if(selected.size > 0 && isImmutable(selected)){
            return selected.toJS()
        }
        return []
    }
)