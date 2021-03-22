import {all} from 'redux-saga/effects'
import optionSaga from 'modules/options/saga'
import modifierSaga from 'modules/modifiers/saga'
export default function* rootsagas(){
    yield all([optionSaga(), modifierSaga()])
}
