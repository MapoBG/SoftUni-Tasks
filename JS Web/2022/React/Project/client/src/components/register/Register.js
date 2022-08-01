import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Register = () => {
    const [registerData, setRegisterData] = useState({
        formBasicEmail: '',
        formBasicPassword: '',
        formBasicRePassword: ''
    });

    const registerDataHandler = (e) => {
        setRegisterData(oldState => ({ ...oldState, [e.target.id]: e.target.value }));
    }

    const registerHandler = (e) => {
        e.preventDefault();

        console.log(registerData);
    }
    return (
        <Form className="AuthForm" onSubmit={(e) => registerHandler(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => registerDataHandler(e)}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => registerDataHandler(e)}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRePassword" onChange={(e) => registerDataHandler(e)}>
                <Form.Label>Repeat password</Form.Label>
                <Form.Control type="password" placeholder="Repeat password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};