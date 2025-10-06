// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Cấu hình theo redux core
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// const initState = [
//     { id: 1, name: "Learn Yoga", completed: false, priority: "Medium" },
//     { id: 2, name: "Learn Redux", completed: true, priority: "High" },
//     { id: 3, name: "Learn Javascript", completed: false, priority: "Low" }
// ];

// const todoListReducerSlice = (state = initState, action) => {
//     switch (action.type) {
//         case "todoList/addTodo": {
//             return [
//                 ...state,
//                 action.payload
//             ]
//         }
//         case "todoList/updateTodo": {
//             const { id, completed } = action.payload;

//             return state.map((todo) =>
//                 todo.id === id ? { ...todo, completed } : todo
//             );
//         }
//         default: return state
//     }
// }

// export default todoListReducerSlice;




// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Cấu hình theo redux toolkit
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

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