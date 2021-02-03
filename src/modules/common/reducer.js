import {fromJS, List} from 'immutable';
import * as Actions from './constants';

const initState = fromJS({
    routes: List()
})

export default function(state=initState, action){
    let {type, payload} = action;
    switch(type) {
        case Actions.SET_TOP_BAR_ROUTES:
            return state.set('routes', fromJS(payload))
        case Actions.REMOVE_TOP_BAR_ROUTES:
            return state.set('routes', initState.get('routes'))
        default:
            return state;
    }
}