import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../../services/authServices";
import { useError } from "../../../custom-hooks/errorHook";


export const Register = () => {
    const navigateTo = useNavigate();
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        rePassword: ''
    });

    const { errors, errorHandler, finalValidation } = useError(registerData);

    const registerDataHandler = (e) => {
        setRegisterData(oldState => ({ ...oldState, [e.target.id]: e.target.value }));
    };

    const registerHandler = (e) => {
        e.preventDefault();
        finalValidation(registerData);

        if (errors.email || errors.password || errors.rePassword) {
            return;
        }

        registerUser(registerData)
            .then(({ user }) => navigateTo(`/user-library/${user.uid}`))
            .catch(err => errorHandler(null, err.code.split('/')[1]));
    };

    return (
        <Form className="AuthForm" onSubmit={registerHandler}>

            <Form.Group className="mb-3" controlId="email" onChange={registerDataHandler} onBlur={errorHandler}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                {errors.email && <Form.Text className="Error">{errors.email}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password" onChange={registerDataHandler} onBlur={errorHandler} >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                {errors.password && <Form.Text className="Error">{errors.password}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="rePassword" onChange={registerDataHandler} onBlur={errorHandler}>
                <Form.Label>Repeat password</Form.Label>
                <Form.Control type="password" placeholder="Repeat password" />
                {errors.rePassword && <Form.Text className="Error">{errors.rePassword}</Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};