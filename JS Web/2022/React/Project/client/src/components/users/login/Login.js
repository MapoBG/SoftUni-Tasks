import { useState, useContext } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../../contexts/authContext";
import { loginUser } from "../../../services/authServices";

export const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const { navigateToHome } = useContext(AuthContext);

    const loginDataHandler = (e) => {
        setLoginData(oldState => ({ ...oldState, [e.target.id]: e.target.value }));
    }

    const loginHandler = (e) => {
        e.preventDefault();

        loginUser(loginData)
            .then(res => navigateToHome())
            .catch(err => console.log(err));
    }

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