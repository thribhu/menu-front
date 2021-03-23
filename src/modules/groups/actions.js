import * as Actions from './constants'

export const addGroup = group => {
    return {
        type: Actions.ADD_GROUP,
        payload: group
    }
}

export const updateGroup = group => {
    return {
        type: Actions.UPDATE_GROUP,
        payload: group
    }
}

export const removeGroup = group => {
    return {
        type: Actions.DELETE_GROUP,
        payload: group
    }
}

export const listGroup = () => {
    return {
        type: Actions.LIST_GROUPS
    }
}

export const detailGroup = group => {
    return {
        type: Actions.DETAIL_GROUP,
        payload: group
    }
}