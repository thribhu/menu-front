import {all} from 'redux-saga/effects'
import optionSaga from 'modules/options/saga'
import modifierSaga from 'modules/modifiers/saga'
import itemsSaga from 'modules/items/saga'
import groupSaga from 'modules/groups/saga'
export default function* rootsagas(){
    yield all([optionSaga(), modifierSaga(), itemsSaga(), groupSaga()])
}
