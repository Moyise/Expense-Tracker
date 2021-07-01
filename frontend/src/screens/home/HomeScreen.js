import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  deleteExpense,
  editExpense,
  getExpenses,
} from "../../actions/expenseActions";
import EditableRow from "../../components/EditableRow";
import ReadOnlyRow from "../../components/ReadOnlyRow";
import { EXPENSE_ADD_RESET } from "../../constants/expenseConstants";
import "./home.scss";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expenseList);
  const { expenses, error } = expenseList;

  const expenseAdd = useSelector((state) => state.expenseAdd);
  const { success } = expenseAdd;

  const expenseEdit = useSelector((state) => state.expenseEdit);
  const { success: expenseUpdateSuccess } = expenseEdit;

  const expenseDelete = useSelector((state) => state.expenseDelete);
  const { success: deleteExpenseSuccess } = expenseDelete;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [editFormData, setEditFormData] = useState({
    name: "",
    amount: "",
  });

  const [editExpenseId, setEditExpenseId] = useState(null);

  const subTotal = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const taxTotal = expenses.reduce((acc, expense) => acc + expense.amount * 0.15, 0);

  useEffect(() => {
    if (success) {
      setOpen(false);
      setName("");
      setAmount("");
      dispatch({ type: EXPENSE_ADD_RESET });
    }
    if (expenseUpdateSuccess) {
      setEditExpenseId(null);
    }
    dispatch(getExpenses());
  }, [dispatch, success, expenseUpdateSuccess, deleteExpenseSuccess]);

  // -- Close new expense form -- //
  const closeHandler = () => {
    setOpen(false);
    setName("");
    setAmount("");
  };

  // -- Submit new expense -- //
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(addExpense({ name, amount }));
  };

  // -- Edit expense -- //
  const editExpenseHandler = (expense) => {
    setEditExpenseId(expense._id);
    setEditFormData({
      name: expense.name,
      amount: expense.amount,
    });
  };

  // -- Handle form input  -- //
  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  // -- Submit edited expense -- //
  const editFormSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(editExpense(editFormData, editExpenseId));
  };

  // -- Cancel expense edit --//
  const cancelFormEditHandler = () => {
    setEditExpenseId(null);
  };

  // -- Delete expense -- //
  const deleteExpenseHandler = (expenseId) => {
    dispatch(deleteExpense(expenseId));
  };

  return (
    <>
      <div className="homeContainer">
        <h1 className="title">Expense tracker</h1>
        <div className="descWrap">
          <div className="desc">
            <p>
              The sub-total of expenses is <strong>{subTotal}$</strong>
            </p>
            <p>
              The total with taxes is <strong>{subTotal + taxTotal}$</strong>
            </p>
          </div>
          <div className="addExpenseWrap">
            <button onClick={() => setOpen(true)} className="addButton">
              Add new expense
            </button>
            <div className={open ? "expenseAdd open" : "expenseAdd"}>
              <form className="expenseForm" onSubmit={submitHandler}>
                <div className="FormGroup">
                  <label className="formLabel">Expense Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="formInput"
                    required
                    placeholder="Enter a name"
                    autoComplete="off"
                    maxLength={40}
                  />
                </div>
                <div className="FormGroup">
                  <label className="formLabel">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="formInput"
                    required
                    placeholder="Enter an amount"
                    autoComplete="off"
                    max="1000"
                  />
                </div>

                <div className="buttonsWrap">
                  <button type="submit" className="formSubmit">
                    Save
                  </button>
                  <div className="cancel" onClick={closeHandler}>
                    Cancel
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {error ? (
          <p>{error}</p>
        ) : (
          <form onSubmit={editFormSubmitHandler}>
            <table className="table">
              <thead>
                <tr className="trTest">
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Taxes (15%)</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <Fragment key={expense._id}>
                    {editExpenseId === expense._id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        cancelFormEditHandler={cancelFormEditHandler}
                      />
                    ) : (
                      <ReadOnlyRow
                        expense={expense}
                        editExpenseHandler={editExpenseHandler}
                        deleteExpenseHandler={deleteExpenseHandler}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
