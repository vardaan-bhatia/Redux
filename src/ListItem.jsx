import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
  setInput,
  setEditId,
  setEditInput,
  setTodos,
} from "./TodoSlice";

const ListItem = () => {
  const { todos, input, editId, editInput } = useSelector(
    (state) => state.todos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      dispatch(setTodos(savedTodos));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        msg: input,
        tick: false,
      };
      dispatch(addTodo(newTodo));
      dispatch(setInput(""));
    }
  };

  const handleEditClick = (id, msg) => {
    dispatch(setEditId(id));
    dispatch(setEditInput(msg));
  };

  const handleUpdate = (id) => {
    if (editInput.trim()) {
      dispatch(updateTodo({ id, msg: editInput }));
      dispatch(setEditId(null));
      dispatch(setEditInput(""));
    } else {
      dispatch(deleteTodo(id));
    }
  };

  return (
    <div className="w-full max-w-2xl h-[calc(100vh-6rem)] mx-auto flex flex-col">
      <div className="flex items-center mb-4">
        <textarea
          value={input}
          placeholder="Add item here..."
          onChange={(e) => dispatch(setInput(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
          className="flex-grow p-2 border border-gray-300 rounded mr-2 resize-none overflow-auto"
          rows="1"
          style={{ overflow: "hidden", resize: "none" }}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-center text-gray-500">Add todo...</p>
      ) : (
        <ul className="flex flex-col space-y-2 overflow-y-auto flex-grow">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center p-2 border-b border-gray-300 hover:bg-blue-200 hover:shadow-xl"
            >
              <input
                type="checkbox"
                checked={todo.tick}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="mr-2"
              />
              {editId === todo.id ? (
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => dispatch(setEditInput(e.target.value))}
                  onBlur={() => handleUpdate(todo.id)}
                  onKeyDown={(c) => {
                    if (c.key === "Enter") {
                      handleUpdate(todo.id);
                    }
                  }}
                  autoFocus
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
              ) : (
                <span
                  className={`flex-grow overflow-hidden ${
                    todo.tick ? "line-through text-gray-500" : ""
                  }`}
                  style={{ wordBreak: "break-all" }}
                >
                  {todo.msg}
                </span>
              )}
              <div className="ml-auto">
                <button
                  onClick={() => handleEditClick(todo.id, todo.msg)}
                  className="ml-2 mr-2 text-blue-500 hover:text-blue-600"
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="ml-2 text-red-500 hover:text-red-600"
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListItem;
