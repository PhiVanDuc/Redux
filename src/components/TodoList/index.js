import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Todo from '../Todo';
import { Col, Row, Input, Button, Select, Tag } from 'antd';

import { nanoid } from 'nanoid';

export default function TodoList() {
    const dispatch = useDispatch();

    const todoList = useSelector(state => {
        const todosRemaining = state.todoList.filter(todo => {
            const searchText = state.filters.search;
            const searchStatus = state.filters.status;

            if (searchStatus === "All") return todo.name.includes(searchText);

            return (
                todo.name.includes(searchText) &&
                (searchStatus === "Completed" ? todo.completed : !todo.completed)
            )
        });

        return todosRemaining;
    });

    const [todoName, setTodoName] = useState("");
    const [todoPriority, setTodoPriority] = useState("Medium");

    const handleClickAddTodo = () => {
        const action = {
            type: "todoList/addTodo",
            payload: {
                id: nanoid(),
                name: todoName,
                completed: false,
                prioriry: todoPriority
            }
        }

        dispatch(action);
        setTodoName("");
    }

    const handleChangeTodoName = (e) => {
        setTodoName(e.target.value);
    }

    const handleChangeTodoPriority = (value) => {
        setTodoPriority(value);
    }

    return (
        <Row style={{ height: 'calc(100% - 40px)' }}>
            <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
                {
                    todoList.map(todo => {
                        return (
                            <Todo
                                key={todo.id}
                                todo={todo}
                            />
                        )
                    })
                }
            </Col>

            <Col span={24}>
                <Input.Group style={{ display: 'flex' }} compact>
                    <Input
                        value={todoName}
                        onChange={handleChangeTodoName}
                    />

                    <Select
                        defaultValue={"Medium"}
                        value={todoPriority}
                        onChange={handleChangeTodoPriority}
                    >
                        <Select.Option value='High' label='High'>
                            <Tag color='red'>High</Tag>
                        </Select.Option>

                        <Select.Option value='Medium' label='Medium'>
                            <Tag color='blue'>Medium</Tag>
                        </Select.Option>

                        <Select.Option value='Low' label='Low'>
                            <Tag color='gray'>Low</Tag>
                        </Select.Option>
                    </Select>

                    <Button
                        type='primary'
                        onClick={handleClickAddTodo}
                    >
                        Add
                    </Button>
                </Input.Group>
            </Col>
        </Row>
    );
}