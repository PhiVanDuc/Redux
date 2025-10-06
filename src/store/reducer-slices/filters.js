// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Cấu hình theo redux core
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// const initState = {
//     search: "",
//     status: "All"
// };

// const filtersReducerSlice = (state = initState, action) => {
//     switch (action.type) {
//         case "todoList/searchText": {
//             return {
//                 ...state,
//                 search: action.payload
//             }
//         }
//         case "todoList/searchStatus": {
//             return {
//                 ...state,
//                 status: action.payload
//             }
//         }
//         default: return state
//     }
// }

// export default filtersReducerSlice;




// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Cấu hình theo redux toolkit
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";

const filtersReducerSlice = createSlice(
    {
        name: 'filters',
        initialState: {
            search: "",
            status: "All"
        },
        reducers: {
            searchText: (state, action) => {
                state.search = action.payload;
            },
            searchStatus: (state, action) => {
                state.status = action.payload;
            }
        }
    }
);

export default filtersReducerSlice;