const express = require("express");
const app = express();
const cors = require("cors");
// const connection = require("./db");
const pooltool = require("./db");

app.use(cors());
app.use(express.json());

//ROUTES//
//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pooltool.query(
      "INSERT INTO todo (description) values ($1) returning *",
      [description]
    );
    res.json(newTodo);
    // only with returning you can see the data in res, but the db has been updated and is not necessary to do so if you will reload the whole list
  } catch (err) {
    console.error(err.message);
  }
});
//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pooltool.query(
      "SELECT * FROM todo ORDER BY todo_id"
    );
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pooltool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pooltool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo is updated");
  } catch (err) {
    console.error(err.message);
  }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pooltool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json("Todo is deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("running on port 5000");
});
