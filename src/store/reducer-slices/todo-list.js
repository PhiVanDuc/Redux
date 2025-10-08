import { createSlice } from "@reduxjs/toolkit";

const todoListReducerSlice = createSlice(
    {
        name: "todoList",
        initialState: [
            { id: 1, name: "Learn Yoga", completed: false, priority: "Medium" },
            { id: 2, name: "Learn Redux", completed: true, priority: "High" },
            { id: 3, name: "Learn Javascript", completed: false, priority: "Low" }
        ],
        reducers: {
            addTodo: (state, action) => {
                state.push(action.payload);
            },
            updateTodo: (state, action) => {
                const { id, completed } = action.payload;

                const todo = state.find(todo => todo.id === id);
                if (todo) todo.completed = completed;
            }
        }
    }
);

export default todoListReducerSlice;