import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    input: "",
    editId: null,
    editInput: "",
  },
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },
    addTodo(state, action) {
      state.todos = [action.payload, ...state.todos];
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo(state, action) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, msg: action.payload.msg }
          : todo
      );
    },
    toggleTodo(state, action) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, tick: !todo.tick } : todo
      );
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    setEditId(state, action) {
      state.editId = action.payload;
    },
    setEditInput(state, action) {
      state.editInput = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
  setInput,
  setEditId,
  setEditInput,
} = TodoSlice.actions;

export default TodoSlice.reducer;
