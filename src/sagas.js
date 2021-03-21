import {all} from 'redux-saga/effects'
import optionSaga from 'modules/options/saga'
export default function* rootsagas(){
    yield all([optionSaga()])
}
