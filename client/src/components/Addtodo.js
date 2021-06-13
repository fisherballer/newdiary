import React from "react";

const Addtodo = ({ onSubmitForm, setitem, item }) => {
  return (
    <>
      <h1>Add items</h1>
      <div className="ct-0 t-ct mp-0">
        <form className="ct-0 mp-0" onSubmit={onSubmitForm}>
          <input
            className="bx-1"
            type="text"
            value={item}
            onChange={(e) => {
              setitem(e.target.value);
            }}
          ></input>
          <button type="submit" className="btn-2">
            +
          </button>
        </form>
      </div>
    </>
  );
};

export default Addtodo;
