import * as Actions from './constants'

export const addItem = item => {
    return {
        type: Actions.ADD_ITEM,
        payload: item
    }
}

export const updateItem = item => {
    return {
        type: Actions.UPDATE_ITEM,
        payload: item
    }
}

export const removeItem = item => {
    return {
        type: Actions.DELETE_ITEM,
        payload: item
    }
}

export const listItems = () => {
    return {
        type: Actions.LIST_ITEMS
    }
}

export const detailItem = item => {
    return {
        type: Actions.DELETE_ITEM,
        payload: item
    }
}
export const setSelected = item => {
    return {
        type: Actions.SET_SELECTED,
        payload: item
    }
}

export const removeSelected = () => {
    return {
        type: Actions.REMOVE_SELECTED
    }
}

export const getListOptionGroups = () => {
    return {
        type: Actions.LIST_OPTIONS_GROUPS
    }
}