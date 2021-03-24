import {takeEvery, put, call} from 'redux-saga/effects'
import * as Actions from './constants'
import {isEmpty} from 'lodash'
import {
    listGroups,
    addGroup,
    deleteGroup,
    updateGroup,
    detailGroup
} from './service'

function* listGroupSaga(){
    try {
    const response = yield call(listGroups)
    const {status, data} = response
    if(status === 200) {
        yield put({
            type: Actions.LIST_GROUPS_SUCCESS,
            payload: isEmpty(data) ? "Please add option groups" : data
        })
    }
    else throw new Error("Unable to fetch modifiers")
    }
    catch(err){
        console.log(err)
        yield ({
            type: Actions.LIST_GROUPS_ERROR,
            error: err.message
        })
    }
}

function* addGroupSaga({payload}){
    try{
        const addReq = yield call(addGroup, payload)
        if(addReq.status === 201){
            yield put({
                type: Actions.ADD_GROUP_SUCCESS,
                payload: addReq.data
            })
        yield put({
            type: Actions.LIST_GROUPS
        }) 
        }
        throw new Error("Unable to add modifiers")
    }
    catch (err){
        console.log(err)
        yield put({
            type: Actions.ADD_GROUP_ERROR,
            error: err.message
        })
    }
}

function* updateGroupSaga({payload}){
    try{
        const updateReq = yield call(updateGroup, payload)
        const {status} = updateReq
        if(status === 200) {
            yield put({
                type: Actions.UPDATE_GROUP_SUCCESS,
                payload: 'success'
            })
        yield put({
            type: Actions.LIST_GROUPS
        })
        }
        throw new Error("Unable to update modifier")
    }
    catch(err){
        console.log(err)
        yield put({
            type: Actions.UPDATE_GROUP_SUCCESS,
            error: err.message 
        })
    }
}
/**
 * 
 * @param {modifierId} modifier 
 * Usually we dont user this function
 * as fetching a single item or option with id is not practical
 */
function* detailGroupSaga({payload}){
    try {
        const req = yield call(detailGroup, payload.id)
        const {status, data} = req
        if(status === 200) {
            yield put({
                type: Actions.DETAIL_GROUP_SUCCESS,
                payload: data
            })
        }
        throw new Error("Unable to fetch group")
    }
    catch(err){
        console.log(err)
        yield put({
            type: Actions.DETAIL_GROUP_ERROR,
            error: err.message
        })
    }
}

function* deleteGroupSaga({payload}){
    try {
        const req = yield call(deleteGroup, payload)
        const {status} = req
        if(status === 204){
            yield put({
                type: Actions.DELETE_GROUP_SUCCESS
            })
            yield put({
                type: Actions.LIST_GROUPS
            })
        }
    }
    catch (err){
        console.log(err)
            yield put({
                type: Actions.LIST_GROUPS
            })
        yield put({
            type: Actions.DELETE_GROUP_ERROR,
            error: err.message
        })
    }
}

export default function* optionSaga(){
    yield takeEvery(Actions.ADD_GROUP, addGroupSaga)
    yield takeEvery(Actions.LIST_GROUPS, listGroupSaga)
    yield takeEvery(Actions.UPDATE_GROUP, updateGroupSaga)
    yield takeEvery(Actions.DETAIL_GROUP, detailGroupSaga)
    yield takeEvery(Actions.DELETE_GROUP, deleteGroupSaga)
}