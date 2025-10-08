import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Col, Row, Input, Typography, Radio } from 'antd';

const { Search } = Input;

export default function Filters() {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState("");
    const [searchStatus, setSearchStatus] = useState("All");

    const handleChangeSearchText = (e) => {
        setSearchText(e.target.value);

        const action = {
            type: "todoList/searchText",
            payload: e.target.value
        };

        dispatch(action);
    }

    const handleChangeSearchStatus = (e) => {
        setSearchStatus(e.target.value);

        const action = {
            type: "todoList/searchStatus",
            payload: e.target.value
        };

        dispatch(action);
    }

    return (
        <Row justify='center'>
            <Col span={24}>
                <Typography.Paragraph
                    style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                >
                    Search
                </Typography.Paragraph>

                <Search
                    placeholder='input search text'
                    value={searchText}
                    onChange={handleChangeSearchText}
                />
            </Col>

            <Col sm={24}>
                <Typography.Paragraph
                    style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                >
                    Filter By Status
                </Typography.Paragraph>

                <Radio.Group value={searchStatus} onChange={handleChangeSearchStatus}>
                    <Radio value='All'>All</Radio>
                    <Radio value='Completed'>Completed</Radio>
                    <Radio value='Todo'>To do</Radio>
                </Radio.Group>
            </Col>
        </Row>
    );
}