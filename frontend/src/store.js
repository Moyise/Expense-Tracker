import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  expenseAddReducer,
  expenseDeleteReducer,
  expenseEditReducer,
} from "./reducers/expenseReducer";

const reducer = combineReducers({
  expenseAdd: expenseAddReducer,
  expenseEdit: expenseEditReducer,
  expenseDelete: expenseDeleteReducer,
});

// const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
