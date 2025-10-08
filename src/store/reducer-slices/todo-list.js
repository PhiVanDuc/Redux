import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos, fetchAddTodo, fetchUpdateTodo } from "../thunks/todo-list";

const todoListReducerSlice = createSlice(
    {
        name: "todoList",
        initialState: {
            status: "idle",
            todos: []
        },
        reducers: {
            addTodo: (state, action) => {
                state.todos.push(action.payload);
            },
            updateTodo: (state, action) => {
                const { id, completed } = action.payload;

                const todo = state.todos.find(todo => todo.id === id);
                if (todo) todo.completed = completed;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchTodos.fulfilled,
                    (state, action) => { state.todos = action.payload }
                )
                .addCase(
                    fetchAddTodo.fulfilled,
                    (state, action) => { state.todos.push(action.payload); }
                )
                .addCase(
                    fetchUpdateTodo.fulfilled,
                    (state, action) => {
                        const { id, completed } = action.payload;

                        const todo = state.todos.find(todo => todo.id === id);
                        if (todo) todo.completed = completed;
                    }
                )
                .addMatcher(
                    (action) => action.type.endsWith("/pending"),
                    (state) => {
                        state.status = "loading";
                    }
                )
                .addMatcher(
                    (action) => action.type.endsWith("/fulfilled"),
                    (state) => {
                        state.status = "idle";
                    }
                )
        }
    }
);

export default todoListReducerSlice;