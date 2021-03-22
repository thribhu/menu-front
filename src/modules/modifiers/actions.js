import * as Actions from './constants'

export const addModifier = modifier => {
    return {
        type: Actions.ADD_MODIFIERS,
        payload: modifier
    }
}

export const updateModifier = modifier => {
    return {
        type: Actions.UPDATE_MODIFIERS,
        payload: modifier
    }
}

export const removeModifier = modifier => {
    return {
        type: Actions.DELETE_MODIFIERS,
        payload: modifier
    }
}

export const listModfiers = () => {
    return {
        type: Actions.LIST_MODIFIERS
    }
}

export const detailModifier = modifier => {
    return {
        type: Actions.DETAIL_MODIFIERS,
        payload: modifier
    }
}