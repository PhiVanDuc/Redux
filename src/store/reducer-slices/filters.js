const initState = {
    search: "",
    status: "All"
};

const filtersReducerSlice = (state = initState, action) => {
    switch (action.type) {
        case "todoList/searchText": {
            return {
                ...state,
                search: action.payload
            }
        }
        case "todoList/searchStatus": {
            return {
                ...state,
                status: action.payload
            }
        }
        default: return state
    }
}

export default filtersReducerSlice;