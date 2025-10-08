import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        const res = await fetch("/api/todos");
        const data = await res.json();

        return data.todos;
    }
);

export const fetchAddTodo = createAsyncThunk(
    "todos/fetchAddTodo",
    async (payload) => {
        const res = await fetch(
            "/api/todos",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        const data = await res.json();
        return data.todos;
    }
);

export const fetchUpdateTodo = createAsyncThunk(
    "todos/fetchUpdateTodo",
    async (payload) => {
        const res = await fetch(
            "/api/updateTodo",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        const data = await res.json();
        return data.todos;
    }
);