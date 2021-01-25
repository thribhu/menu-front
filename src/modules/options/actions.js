import * as Actions from './constants';

export const addOption = option => {
    return {
        type: Actions.ADD_OPTION,
        payload: option
    } 
}

export const remvoeOption = option => {
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