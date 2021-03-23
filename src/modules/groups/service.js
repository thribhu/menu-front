import api from 'api'
import axios from 'axios'
const base = api()+'groups/'

/*
* GET api/groups/
* returns list of groups
* status 200
*/
export const listGroups = () => {
    return axios.get(base)
}

/**
 * GET api/groups/{group}
 * returns single modifier detail
 * status 200
 */

export const detailGroup = id => {
    return axios.get(base+`${id}/`)
}

/**
 * POST api/groups/
 * add an group
 * returns group
 * status 201
 */
export const addGroup = group => {
    return axios.post(base, group)
}

/**
 * PUT api/groups/{group}
 * returns updated group
 * status 200
 */

export const updateGroup = group => {
    return axios.put(base+`${group.id}/`, group)
}
/**
 * DELETE api/groups/{group}
 * returns null
 * status 204
 */

export const deleteGroup = group => {
    return axios.delete(base+`${group}/`)
}