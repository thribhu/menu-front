import {takeEvery, put, call} from 'redux-saga/effects'
import * as Actions from './constants'
import {createBrowserHistory} from 'history'
import {
    listmodifiers,
    addModifiers,
    deleteModifier,
    detailModifiers,
    updateModifier
} from './service'

const history = createBrowserHistory()
function* listModifierSaga(){
    try {
    const response = yield call(listmodifiers)
    const {status, data} = response
    if(status === 200) {
        yield put({
            type: Actions.LIST_MODIFIERS_SUCCESS,
            payload: data
        })
    }
    else throw new Error("Unable to fetch modifiers")
    }
    catch(err){
        console.log(err)
        yield ({
            type: Actions.LIST_MODIFIERS_ERROR,
            error: err.message
        })
    }
}

function* addModifierSaga({payload}){
    try{
        const addReq = yield call(addModifiers, payload)
        const {status} = addReq
        if(status === 201){
            yield put({
                type: Actions.ADD_MODIFIERS_SUCCESS,
                payload: addReq.data
            })
        yield put({
            type: Actions.LIST_MODIFIERS
        }) 
        }
        else throw new Error("Unable to add modifiers")
    }
    catch (err){
        console.log(err)
        alert(err.message)
        yield put({
            type: Actions.LIST_MODIFIERS
        }) 
        yield put({
            type: Actions.ADD_MODIFIERS_ERROR,
            error: err.message
        })
    }
}

function* updateModifierSaga({payload}){
    try{
        const updateReq = yield call(updateModifier, payload)
        const {status} = updateReq
        if(status === 200) {
            alert("Update modifier success")
            yield put({
                type: Actions.UPDATE_MODIFIERS_SUCCESS,
                payload: 'success'
            })
        yield put({
            type: Actions.LIST_MODIFIERS
        })
        history.go(-1)
        }
        else{
            throw new Error("Unable to update modifier")
        }
    }
    catch(err){
        console.log(err)
        yield put({
            type: Actions.LIST_MODIFIERS
        }) 
        yield put({
            type: Actions.UPDATE_MODIFIERS_ERROR,
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
function* detailModifierSaga({payload}){
    try {
        const req = yield call(detailModifiers, payload.id)
        const {status, data} = req
        if(status === 200) {
            yield put({
                type: Actions.DETAIL_MODIFIERS_SUCCESS,
                payload: data
            })
        }
        throw new Error("Unable to fetch modifier")
    }
    catch(err){
        console.log(err)
        yield put({
            type: Actions.DETAIL_MODIFIERS_ERROR,
            error: err.message
        })
    }
}

function* deleteModifierSaga({payload}){
    try {
        const req = yield call(deleteModifier, payload)
        const {status} = req
        if(status === 204){
            yield put({
                type: Actions.DELETE_MODIFIERS_SUCCESS
            })
            yield put({
                type: Actions.LIST_MODIFIERS
            })
        }
        else if (status === 500) {
            throw new Error('Modifier being referenced')
        }
    }
    catch (err){
        alert('Unable to delete Modifier')
        yield put({
            type: Actions.LIST_MODIFIERS
        }) 
        yield put({
            type: Actions.DELETE_MODIFIERS_ERROR,
            error: err.message
        })
    }
}

export default function* optionSaga(){
    yield takeEvery(Actions.ADD_MODIFIERS, addModifierSaga)
    yield takeEvery(Actions.LIST_MODIFIERS, listModifierSaga)
    yield takeEvery(Actions.UPDATE_MODIFIERS, updateModifierSaga)
    yield takeEvery(Actions.DETAIL_MODIFIERS, detailModifierSaga)
    yield takeEvery(Actions.DELETE_MODIFIERS, deleteModifierSaga)
}