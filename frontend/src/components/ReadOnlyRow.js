import React from "react";

const ReadOnlyRow = ({ expense, editExpenseHandler, deleteExpenseHandler }) => {
  // -- Time formatting -- //
  const d = new Date(expense.updatedAt);
  const date = d.toISOString().split("T")[0];
  const time = d.toTimeString().split(" ")[0].substring(0, 5);

  return (
    <tr>
      <td>{expense.name}</td>
      <td>{expense.amount}</td>
      <td>{(expense.amount * 0.15).toFixed(2)}</td>
      <td>
        {date} at {time}
      </td>
      <td>
        <div className="buttons">
          <button className="edit" onClick={() => editExpenseHandler(expense)}>
            Edit
          </button>
          <div className="delete" onClick={() => deleteExpenseHandler(expense._id)}>
            Delete
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
