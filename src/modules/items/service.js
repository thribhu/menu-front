import api from 'api'
import axios from 'axios'
const base = api()+'items/'

/*
* GET api/items/
* returns list of items
* status 200
*/
export const listitems = () => {
    return axios.get(base)
}

/**
 * GET api/items/{item}
 * returns single item detail
 * status 200
 */

export const detailItems = id => {
    return axios.get(base+`${id}/`)
}

/**
 * POST api/items/
 * add an item
 * returns item
 * status 201
 */
export const addItems = item=> {
    return axios.post(base, item)
}

/**
 * PUT api/items/{item}
 * returns updated item
 * status 200
 */

export const updateItem = item => {
    return axios.put(base+`${item.id}/`, item)
}

/**
 * DELETE api/items/{item}
 * returns null
 * status 204
 */

export const deleteItem = item => {
    return axios.delete(base+`${item}/`)
}


/**
 * GET both options, groups
 */
export const listOptionGroupSerive = () => {
    return axios.get(api()+"list-options-groups/")
}