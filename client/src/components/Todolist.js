import React from "react";
import Deletetodo from "./Deletetodo";
import Edittodo from "./Edittodo";

const Todolist = ({ todo, deletedata, setdata }) => {
  return (
    <>
      <div className="ct-2 m-2">
        <h3 className="act">
          {todo.todo_id}. {todo.description}
        </h3>
        <Edittodo todo={{ ...todo }} setdata={setdata} />
        <Deletetodo todo={{ ...todo }} deletedata={deletedata} />
      </div>
    </>
  );
};

export default Todolist;
