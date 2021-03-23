import api from 'api'
import axios from 'axios'
const base = api()+"options/"

/*
* GET api/options/
* returns list of options
* status 200
*/
export const listoptions = () => {
    return axios.get(base)
}

/**
 * GET api/options/{option}
 * returns single option detail
 * status 200
 */

export const detailOption = id => {
    return axios.get(base+`${id}/`)
}

/**
 * POST api/options/
 * add an option
 * returns option 
 * status 201
 */
export const addOption = option => {
    return axios.post(base, option)
}

/**
 * PUT api/options/{option}
 * returns updated option
 * status 200
 */

export const updateOption = option => {
    return axios.put(base+`${option.id}/`, option)
}

/**
 * DELETE api/options/{option}
 * returns null
 * status 204
 */

export const deleteOption = option => {
    return axios.delete(base+`${option}/`)
}