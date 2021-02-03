import * as Actions from './constants'

export const addTopbarRoutes = payload => {
    return {
        type: Actions.SET_TOP_BAR_ROUTES,
        payload
    }
}

export const removeTopBarRotues = () => {
    return {
        type: Actions.REMOVE_TOP_BAR_ROUTES,
    }
}