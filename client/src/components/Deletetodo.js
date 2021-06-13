import React from "react";

const Deletetodo = ({ todo, deletedata }) => {
  return (
    <>
      <button
        className="btn m-2"
        onClick={() => {
          deletedata(todo.todo_id);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default Deletetodo;
