import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Login = () => {
    const [loginData, setLoginData] = useState({
        formBasicEmail: '',
        formBasicPassword: ''
    });

    const loginDataHandler = (e) => {
        setLoginData(oldState => ({ ...oldState, [e.target.id]: e.target.value }));
    }

    const loginHandler = (e) => {
        e.preventDefault();

        console.log(loginData);
    }

    return (
        <Form className="AuthForm" onSubmit={(e) => loginHandler(e)} >
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => loginDataHandler(e)}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => loginDataHandler(e)}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form >
    );
};