import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../../services/authServices";
import { useError } from "../../../custom-hooks/errorHook";


export const Login = () => {
    const navigateTo = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const { errors, errorHandler, finalValidation } = useError(loginData);

    const loginDataHandler = (e) => {
        setLoginData(oldState => ({ ...oldState, [e.target.id]: e.target.value }));
    };

    const loginHandler = (e) => {
        e.preventDefault();

        finalValidation(loginData);

        if (errors.email || errors.password || !loginData.email || !loginData.password) {
            return;
        }

        loginUser(loginData)
            .then(({ user }) => navigateTo(`/user-library/${user.uid}`))
            .catch(err => errorHandler(null, err.code.split('/')[1]));
    };

    return (
        <Form className="AuthForm" onSubmit={loginHandler} >

            <Form.Group className="mb-3" controlId="email" onChange={loginDataHandler} onBlur={errorHandler}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                {errors.email && <Form.Text className="Error">{errors.email}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password" onChange={loginDataHandler} onBlur={errorHandler}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                {errors.password && <Form.Text className="Error">{errors.password}</Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form >
    );
};