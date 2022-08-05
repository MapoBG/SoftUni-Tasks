import { useContext, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../../contexts/authContext";
import { registerUser } from "../../../services/userServices";

export const Register = () => {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        rePassword: ''
    });

    const { navigateToHome } = useContext(AuthContext);

    const registerDataHandler = (e) => {
        setRegisterData(oldState => ({ ...oldState, [e.target.id]: e.target.value }));
    }

    const registerHandler = (e) => {
        e.preventDefault();

        registerUser(registerData)
            .then(res => navigateToHome())
            .catch(err => console.log(err.code));
    }
    return (
        <Form className="AuthForm" onSubmit={(e) => registerHandler(e)}>
            <Form.Group className="mb-3" controlId="email" onChange={registerDataHandler}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password" onChange={registerDataHandler}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="rePassword" onChange={registerDataHandler}>
                <Form.Label>Repeat password</Form.Label>
                <Form.Control type="password" placeholder="Repeat password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};