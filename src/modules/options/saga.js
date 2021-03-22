import {takeEvery, put, call} from 'redux-saga/effects'
import {listoptions, detailOption, deleteOption, addOption, updateOption} from './service'
import * as Actions from './constants'

function* listOptionSaga(){
    try {
    const response = yield call(listoptions)
    const {status, data} = response
    if(status === 200) {
        yield put({
            type: Actions.LIST_OPTIONS_SUCCESS,
            payload: data
        })
    }
    else throw new Error("Unable to fetch options")
    }
    catch(err){
        console.log(err)
        yield ({
            type: Actions.LIST_OPTIONS_ERROR,
            error: err.message
        })
    }
}

function* addOptionSaga({payload}){
    try{
        const addReq = yield call(addOption, payload)
        if(addReq.status === 201){
            yield put({
                type: Actions.ADD_OPTION_SUCCESS,
                payload: addReq.data
            })
        yield call(listOptionSaga)
        }
        throw new Error("Unable to add option")
    }
    catch (err){
        console.log(err)
        yield put({
            type: Actions.ADD_OPTION_ERROR,
            error: err.message
        })
    }
}

function* updateOptionSaga(payload){
    try{
        const updateReq = yield call(updateOption, payload)
        const {status} = updateOption
        if(status === 200) {
            yield put({
                type: Actions.UPDATE_OPTION_SUCCESS,
                payload: 'success'
            })
        yield call(listOptionSaga)
        }
        throw new Error("Unable to update option")
    }
    catch(err){
        console.log(err)
        yield put({
            type: Actions.UPDATE_OPTION_ERROR,
            error: err.message 
        })
    }
}
/**
 * 
 * @param {optionId} option 
 * Usually we dont user this function
 * as fetching a single item or option with id is not practical
 */
function* detailOptionSaga(option){
    try {
        const req = yield call(detailOption, option)
        const {status, data} = req
        if(status === 200) {
            yield put({
                type: Actions.DETAIL_OPTION_SUCCESS,
                payload: data
            })
        }
        throw new Error("Unable to fetch option")
    }
    catch(err){
        console.log(err)
        yield put({
            type: Actions.DETAIL_OPTION_ERROR,
            error: err.message
        })
    }
}

function* deleteOptionSaga({payload}){
    try {
        const req = yield call(deleteOption, payload.id)
        const {status} = req
        if(status === 204){
            yield put({
                type: Actions.REMOVE_OPTION_SUCCESS
            })
            yield put({
                type: Actions.LIST_OPTIONS
            })
        }
    }
    catch (err){
        console.log(err)
        yield put({
            type: Actions.REMOVE_OPTION_ERROR,
            error: err.message
        })
    }
}

export default function* optionSaga(){
    yield takeEvery(Actions.ADD_OPTION, addOptionSaga)
    yield takeEvery(Actions.LIST_OPTIONS, listOptionSaga)
    yield takeEvery(Actions.UPDATE_OPTION, updateOptionSaga)
    yield takeEvery(Actions.DETAIL_OPTION, detailOptionSaga)
    yield takeEvery(Actions.REMOVE_OPTION, deleteOptionSaga)
}