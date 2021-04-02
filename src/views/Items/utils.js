import { filter, map } from 'lodash'
export const splitOptionsAndGroups = (list) => {
    //if max_allowed in keys then group else option
    const groups = filter(list, "max_allowed") 
    const options = filter(list, 'type')
    return {
        option_groups: map(groups, a => a.id),
        options: map(options, a => a.id)
    }
}