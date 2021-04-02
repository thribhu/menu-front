import api from 'api'
import axios from 'axios'
const base = api()+'modifiers/'

/*
* GET api/modifiers/
* returns list of modifiers
* status 200
*/
export const listmodifiers = () => {
    return axios.get(base)
}

/**
 * GET api/modifiers/{modifier}
 * returns single modifier detail
 * status 200
 */

export const detailModifiers = id => {
    return axios.get(base+`${id}/`)
}

/**
 * POST api/modifiers/
 * add a modifier
 * returns modifier
 * status 201
 */
export const addModifiers = modifier=> {
    return axios.post(base, modifier)
}

/**
 * PUT api/modifiers/{modifier}
 * returns updated modifier
 * status 200
 */

export const updateModifier = modifier => {
    return axios.put(base+`${modifier.id}/`, modifier)
}

/**
 * DELETE api/modifiers/{modifier}
 * returns null
 * status 204
 */

export const deleteModifier = modifier => {
    return axios.delete(base+`${modifier}/`)
}