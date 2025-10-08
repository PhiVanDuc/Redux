const initState = [
    { id: 1, name: "Learn Yoga", completed: false, priority: "Medium" },
    { id: 2, name: "Learn Redux", completed: true, priority: "High" },
    { id: 3, name: "Learn Javascript", completed: false, priority: "Low" }
];

const todoListReducerSlice = (state = initState, action) => {
    switch (action.type) {
        case "todoList/addTodo": {
            return [
                ...state,
                action.payload
            ]
        }
        case "todoList/updateTodo": {
            const { id, completed } = action.payload;

            return state.map((todo) =>
                todo.id === id ? { ...todo, completed } : todo
            );
        }
        default: return state
    }
}

export default todoListReducerSlice;