import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { loginUser } from "../../../services/authServices";
import { useCustomNavigate } from "../../../custom-hooks/navigateHooks";

export const Login = () => {
    const navigateTo = useCustomNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const loginDataHandler = (e) => {
        setLoginData(oldState => ({ ...oldState, [e.target.id]: e.target.value }));
    };

    const loginHandler = (e) => {
        e.preventDefault();

        loginUser(loginData)
            .then(({ user }) => navigateTo(`/user-library/${user.uid}`))
            .catch(err => console.log(err));
    };

    return (
        <Form className="AuthForm" onSubmit={(e) => loginHandler(e)} >
            <Form.Group className="mb-3" controlId="email" onChange={loginDataHandler}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password" onChange={loginDataHandler}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form >
    );
};