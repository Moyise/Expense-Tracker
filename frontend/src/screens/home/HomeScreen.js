import React, { Fragment, useState } from "react";
import EditableRow from "../../components/EditableRow";
import ReadOnlyRow from "../../components/ReadOnlyRow";
import expenses from "../../expenses";
import "./home.scss";

const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
    amount: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    amount: "",
  });

  const [editExpenseId, setEditExpenseId] = useState(null);

  const subTotal = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const taxTotal = expenses.reduce((acc, expense) => acc + expense.amount * 0.15, 0);

  const closeHandler = () => {
    setOpen(false);
    setAddFormData({
      name: "",
      amount: "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const editExpenseHandler = (expense) => {
    setEditExpenseId(expense.id);
    setEditFormData({
      name: expense.name,
      amount: expense.amount,
    });
  };

  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    console.log();
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const editFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log(editFormData.name);
    console.log(editFormData.amount);
  };

  const cancelFormEditHandler = () => {
    setEditExpenseId(null);
  };

  const deleteExpenseHandler = (expenseId) => {
    // console.log(expenseId);
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
                    value={addFormData.name}
                    onChange={(e) =>
                      setAddFormData({
                        name: e.target.value,
                      })
                    }
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
                    value={addFormData.amount}
                    onChange={(e) =>
                      setAddFormData({
                        amount: e.target.value,
                      })
                    }
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
                <Fragment key={expense.id}>
                  {editExpenseId === expense.id ? (
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
      </div>
    </>
  );
};

export default HomeScreen;
