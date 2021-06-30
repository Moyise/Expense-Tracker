import React from "react";

const ReadOnlyRow = ({ expense, editExpenseHandler, deleteExpenseHandler }) => {
  return (
    <tr>
      <td>{expense.name}</td>
      <td>{expense.amount}</td>
      <td>{(expense.amount * 0.15).toFixed(2)}</td>
      <td>2020-02-18 at 22:15</td>
      <td>
        <div className="buttons">
          <button className="edit" onClick={() => editExpenseHandler(expense)}>
            Edit
          </button>
          <div className="delete" onClick={() => deleteExpenseHandler(expense.id)}>
            Delete
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
