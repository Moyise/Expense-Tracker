import axios from "axios";
import {
  EXPENSE_ADD_FAIL,
  EXPENSE_ADD_REQUEST,
  EXPENSE_ADD_SUCCESS,
  EXPENSE_DELETE_FAIL,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_DELETE_SUCCESS,
  EXPENSE_EDIT_FAIL,
  EXPENSE_EDIT_REQUEST,
  EXPENSE_EDIT_SUCCESS,
  EXPENSE_LIST_FAIL,
  EXPENSE_LIST_REQUEST,
  EXPENSE_LIST_SUCCESS,
} from "../constants/expenseConstants";

export const getExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_LIST_REQUEST });

    const { data } = await axios.get(`/api/expenses`);

    dispatch({
      type: EXPENSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addExpense = (expense) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/expenses", expense, config);

    dispatch({ type: EXPENSE_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPENSE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editExpense = (expense, expenseId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_EDIT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/expenses/${expenseId}`, expense, config);

    dispatch({ type: EXPENSE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPENSE_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteExpense = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_DELETE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.delete(`/api/expenses/${id}`, config);

    dispatch({ type: EXPENSE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EXPENSE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
