import {createSelector} from 'reselect'
import {isImmutable} from 'immutable'
import _ from 'loadsh';

const options = state => state.options;

export const loadingSelector = createSelector(
    options, 
    data => data.get('loading')
)

export const errorSelector = createSelector(
    options, 
    data => {
        var error = data.get('error')
        if(isImmutable(error)) {
            return error.toJS()
        }
        else return error ? error : ''
    }
)

 export const optionsSelector= createSelector(
     options,
     data => {
         var list = data.get('options')
         if (isImmutable(list)) {
             return list.toJS()
         }
         else return [] 
     }
 )

 export const selectedOptionsSelector = createSelector(
     options, 
     data => {
         var list = data.get('selectedOptions')
         if(isImmutable(list)){
             return list.toJS()
         }
         return []
     }
 )

 export const nowOptionSelector = createSelector(
     options,
     data => {
         var option = data.get('optionToEdit')
         if(isImmutable(option)){
             return option.toJS()
         }
         return {}
     }
 )