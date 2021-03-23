import {createSelector} from 'reselect'
import {isImmutable} from 'immutable'

const modifiers = state => state.modifiers

export const loadingSelector = createSelector(
    modifiers, 
    data => data.get('loading')
)

export const errorSelector = createSelector(
    modifiers,
    data => {
        let error = data.get('error')
        if (isImmutable(error)){
            return error.toJS()
        }
        return error
    }
)

export const listSelector = createSelector(
    modifiers,
    data => {
        let modifiers = data.get('modifiers')
        if(isImmutable(modifiers)){
            return modifiers.toJS()
        }
        return []
    }
)

export const selectedSelector = createSelector(
    modifiers, 
    data => {
        let selected = data.get('selected')
        if(selected.size > 0 && isImmutable(selected)){
            return selected.toJS()
        }
        return []
    }
)