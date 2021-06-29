import React from "react";
import "./home.scss";

const HomeScreen = () => {
  return (
    <>
      <div className="homeContainer">
        <h1 className="title">Expense tracker</h1>
        <div className="descWrap">
          <div className="desc">
            <p>
              The sub-total of expenses is <strong>36$</strong>
            </p>
            <p>
              The total with taxes is <strong>41.40$</strong>
            </p>
          </div>
          <button className="addButton">Add new expense</button>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
