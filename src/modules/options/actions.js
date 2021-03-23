import * as Actions from './constants';

export const addOption = option => {
    return {
        type: Actions.ADD_OPTION,
        payload: option
    } 
}

export const removeOption = option => {
    return {
        type: Actions.REMOVE_OPTION,
        payload: option
    }
}

export const updateOption = option => {
    return {
        type: Actions.UPDATE_OPTION,
        payload: option
    }
}

export const listOptions = () => {
    return {
        type: Actions.LIST_OPTIONS
    }
}

export const sortedOptions = (payload) => {
    return {
        type: Actions.SORTED_OPTIONS
    }
}

export const setSelected = (payload) => {
    return {
        type: Actions.SET_SELECTED,
        payload
    }
}

export const removeSelected = () => {
    return {
        type: Actions.REMOVE_SELECTED
    }
}