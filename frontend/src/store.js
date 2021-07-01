import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"; // -- redux devTools extension on Google Chrome -- //
import {
  expenseAddReducer,
  expenseDeleteReducer,
  expenseEditReducer,
  expenseListReducer,
} from "./reducers/expenseReducer";

const reducer = combineReducers({
  expenseList: expenseListReducer,
  expenseAdd: expenseAddReducer,
  expenseEdit: expenseEditReducer,
  expenseDelete: expenseDeleteReducer,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
