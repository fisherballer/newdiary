import React, { useState, useRef, useEffect } from "react";

const Edittodo = ({ todo, setdata }) => {
  const [style1, setstyle1] = useState("modal notshow");
  const [value1, setvalue1] = useState("");
  const input1 = useRef();
  useEffect(() => {
    input1.current.focus();
  }, [style1]);
  return (
    <>
      <button
        className="btn m-2"
        onClick={() => {
          setstyle1("modal show");
        }}
      >
        Edit
      </button>
      <form
        className={style1}
        onClick={(e) => {
          e.target.className.includes("show") && setstyle1("modal notshow");
          input1.current.focus();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          setdata(todo.todo_id, value1);
          e.target.reset();
          setvalue1("");
          setstyle1("modal notshow");
        }}
      >
        <div className="modalbox">
          <div className="modalinsidebox">
            <h3>
              {todo.todo_id}.{todo.description}
            </h3>
            <hr />
            <label>
              <h3>EDIT YOUR ITEM HERE</h3>
            </label>
            <input
              ref={input1}
              type="text"
              className="bx-2"
              placeholder={value1}
              onChange={(e) => {
                e.key !== "Enter" && setvalue1(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </form>
    </>
  );
};

export default Edittodo;
