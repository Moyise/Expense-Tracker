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
} from "../constants/expenseConstants";

export const addExpense = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/expenses", {}, config);

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

export const editExpense = (expense) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_EDIT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/expenses/${expense._id}`, expense, config);

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

    await axios.put(`/api/expenses/${id}`, config);

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
