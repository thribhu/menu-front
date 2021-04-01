import { takeEvery, put, call } from "redux-saga/effects";
import * as Actions from "./constants";
import {
  listitems,
  addItems,
  updateItem,
  deleteItem,
  detailItems,
} from "./service";
import { isEmpty } from "lodash";
function* listItemsSaga() {
  try {
    const response = yield call(listitems);
    const { status, data } = response;
    if (status === 200) {
      if (isEmpty(data)) {
        yield put({
          type: Actions.LIST_ITEMS_SUCCESS,
          payload: "No items in the database",
        });
      } else {
        yield put({
          type: Actions.LIST_ITEMS_SUCCESS,
          payload: data,
        });
      }
    } else throw new Error("Unable to fetch modifiers");
  } catch (err) {
    console.log(err);
    yield {
      type: Actions.LIST_ITEMS_ERROR,
      error: err.message,
    };
  }
}

function* addItemsSaga({ payload }) {
  try {
    const addReq = yield call(addItems, payload);
    if (addReq.status === 201) {
      yield put({
        type: Actions.ADD_ITEM_SUCCESS,
        payload: addReq.data,
      });
      yield put({
        type: Actions.LIST_ITEMS,
      });
    }
    else throw new Error("Unable to add items");
  } catch (err) {
    console.log(err);
    yield put({
      type: Actions.ADD_ITEM_ERROR,
      error: err.message,
    });
  }
}

function* updateItemsSaga({ payload }) {
  try {
    const updateReq = yield call(updateItem, payload);
    const { status } = updateReq;
    if (status === 201) {
      alert('Item update success')
      yield put({
        type: Actions.UPDATE_ITEM_ERROR,
        payload: "success",
      });
      yield put({
        type: Actions.LIST_ITEMS,
      });
    }
    else throw new Error("Unable to update items");
  } catch (err) {
    alert('Item update failed')
    console.log(err);
    yield put({
      type: Actions.UPDATE_ITEM_ERROR,
      error: err.message,
    });
  }
}
/**
 *
 * @param {item} items
 * Usually we dont user this function
 * as fetching a single item or option with id is not practical
 */
function* detailItemsSaga({ payload }) {
  try {
    const req = yield call(detailItems, payload.id);
    const { status, data } = req;
    if (status === 200) {
      yield put({
        type: Actions.DETAIL_ITEM_SUCCESS,
        payload: data,
      });
    }
    else throw new Error("Unable to fetch items");
  } catch (err) {
    console.log(err);
    yield put({
      type: Actions.DETAIL_ITEM_ERROR,
      error: err.message,
    });
  }
}

function* deleteItemsSaga({ payload }) {
  try {
    const req = yield call(deleteItem, payload);
    const { status } = req;
    if (status === 204) {
      yield put({
        type: Actions.DELETE_ITEM_SUCCESS,
      });
      yield put({
        type: Actions.LIST_ITEMS,
      });
    }
  } catch (err) {
    console.log(err);
      yield put({
        type: Actions.LIST_ITEMS,
      });
    yield put({
      type: Actions.DELETE_ITEM_SUCCESS,
      error: err.message,
    });
  }
}

export default function* optionSaga() {
  yield takeEvery(Actions.ADD_ITEM, addItemsSaga);
  yield takeEvery(Actions.LIST_ITEMS, listItemsSaga);
  yield takeEvery(Actions.UPDATE_ITEM, updateItemsSaga);
  yield takeEvery(Actions.DETAIL_ITEM, detailItemsSaga);
  yield takeEvery(Actions.DELETE_ITEM, deleteItemsSaga);
}
