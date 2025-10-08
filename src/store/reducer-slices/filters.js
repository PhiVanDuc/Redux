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