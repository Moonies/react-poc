import React, {useState} from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router'
 

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
export default () => {
    const [token, setToken] = useState({})
    // let token = {};
    const onFinish = values => {
        console.log('Success:', values);
        login(values)
    };
    const [getToken, setGetToken] = useState(false)

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const login = (values) => {
    
        axios.post('https://candidate.neversitup.com/todo/users/auth', {username: values.username, password: values.password})
            .then(result => {
                // console.log(result.data.token)
                setToken({token: result.data.token})
                // token = result.data.token
                // console.log(token)
                setGetToken(true);
                // return <Redirect to="/main" />
            })
    }
    return (
        <>
        {getToken ? <Redirect to= {{pathname: '/main', state:{token}}}/>: null}
            <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>
        
    );
};

