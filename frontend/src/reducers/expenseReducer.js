import {
  EXPENSE_ADD_FAIL,
  EXPENSE_ADD_REQUEST,
  EXPENSE_ADD_RESET,
  EXPENSE_ADD_SUCCESS,
  EXPENSE_DELETE_FAIL,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_DELETE_SUCCESS,
  EXPENSE_EDIT_FAIL,
  EXPENSE_EDIT_REQUEST,
  EXPENSE_EDIT_RESET,
  EXPENSE_EDIT_SUCCESS,
  EXPENSE_LIST_FAIL,
  EXPENSE_LIST_REQUEST,
  EXPENSE_LIST_SUCCESS,
} from "../constants/expenseConstants";

export const expenseListReducer = (state = { expenses: [] }, { type, payload }) => {
  switch (type) {
    case EXPENSE_LIST_REQUEST:
      return { ...state, loading: true, expenses: [] };
    case EXPENSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        expenses: payload.expenses,
      };
    case EXPENSE_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const expenseAddReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EXPENSE_ADD_REQUEST:
      return { loading: true };

    case EXPENSE_ADD_SUCCESS:
      return { loading: false, expense: payload, success: true };

    case EXPENSE_ADD_FAIL:
      return { loading: false, error: payload };

    case EXPENSE_ADD_RESET:
      return {};

    default:
      return state;
  }
};

export const expenseEditReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EXPENSE_EDIT_REQUEST:
      return { loading: true };

    case EXPENSE_EDIT_SUCCESS:
      return { loading: false, expense: payload, success: true };

    case EXPENSE_EDIT_FAIL:
      return { loading: false, error: payload };

    case EXPENSE_EDIT_RESET:
      return {};

    default:
      return state;
  }
};

export const expenseDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EXPENSE_DELETE_REQUEST:
      return { loading: true };

    case EXPENSE_DELETE_SUCCESS:
      return { loading: false, success: true };

    case EXPENSE_DELETE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
