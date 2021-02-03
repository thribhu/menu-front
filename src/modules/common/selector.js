import {createSelector} from 'reselect';
const root = state => state.common

export const topBarRoutesSelector = createSelector(
    root, 
    data => {
        var routes;
        if (data.get('routes').size > 0) {
            routes = data.get('routes').toJS()
            return routes;
        }
        return []
    }
)