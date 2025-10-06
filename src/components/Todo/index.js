import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Row, Tag, Checkbox } from 'antd';

import todoListReducerSlice from "../../store/reducer-slices/todo-list";

const priorityColorMapping = {
    High: 'red',
    Medium: 'blue',
    Low: 'gray',
};

export default function Todo({ todo: { id, name, completed, priority } }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(completed);

    const toggleCheckbox = () => {
        setChecked(!checked);

        // -------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------
        // Dispatch theo redux core
        // -------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------

        // const action = {
        //     type: "todoList/updateTodo",
        //     payload: { id, completed: !checked }
        // }

        // dispatch(action);




        // -------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------
        // Dispatch theo redux toolkit
        // -------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------

        dispatch(
            todoListReducerSlice.actions.updateTodo({
                id,
                completed: !checked
            })
        );
    };

    return (
        <Row
            justify='space-between'
            style={{
                marginBottom: 3,
                ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
            }}
        >
            <Checkbox checked={checked} onChange={toggleCheckbox}>
                {name}
            </Checkbox>

            <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
                {priority}
            </Tag>
        </Row>
    );
}
