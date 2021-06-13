import React, { useState, useEffect, useReducer } from "react";

import "./App.css";
import Todolist from "./components/Todolist";
import Addtodo from "./components/Addtodo";

//function variables
export const ACTIONS = {
  LD_TODO: "load-todo",
  EDT_TODO: "edit-todo",
  DEL_TODO: "delete-todo",
  ADD_TODO: "add-todo",
};

function handletodo(statetodo, action) {
  switch (action.type) {
    case ACTIONS.LD_TODO: {
      return [...action.payload.jsondata];
    }
    case ACTIONS.DEL_TODO:
      return [
        ...statetodo.filter((todo) => todo.todo_id !== action.payload.id),
      ];
    case ACTIONS.EDT_TODO:
      return [
        ...statetodo.map((todo) => {
          if (todo.todo_id === action.payload.id) {
            return { ...todo, description: action.payload.item };
          } else {
            return { ...todo };
          }
        }),
      ];
  }
}

function App() {
  //Functions of the "AddTODO"
  const [statetodo, dispatch] = useReducer(handletodo, []);
  const [item, setitem] = useState("");
  //reducer part to declare functions

  // const [description, setdescription] = useState("");
  const setdata = async (id, item) => {
    dispatch({ type: ACTIONS.EDT_TODO, payload: { id: id, item: item } });

    const url = "http://localhost:5000/todos/" + id;

    try {
      const body = { description: item };
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description: item };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err.message);
    }
    setitem("");
    loaddata();
  };
  //Functions of the "TODOLIST"
  const loaddata = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsondata = await response.json();
      dispatch({
        type: ACTIONS.LD_TODO,
        payload: { jsondata },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deletedata = async (id) => {
    dispatch({ type: ACTIONS.DEL_TODO, payload: { id } });
    const url = "http://localhost:5000/todos/" + id;

    try {
      const deletedata = await fetch(url, {
        method: "DELETE",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  //Functions of the "EDIT"
  //Functions of the "DELETE"

  return (
    <div className="App">
      <Addtodo onSubmitForm={onSubmitForm} setitem={setitem} item={item} />
      <div className="ct-1 m-2">
        {statetodo.map((todo) => {
          return (
            <Todolist
              todo={{ ...todo }}
              setdata={setdata}
              deletedata={deletedata}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
