import { useContext, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../../contexts/authContext";
import { registerUser } from "../../../services/authServices";
import { checkUserEmail, checkUserPasswords, finalValidation } from "../../../services/errorServices";

export const Register = () => {
    const { navigateToHome } = useContext(AuthContext);
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        rePassword: ''
    });
    const [errors, setErrors] = useState({
        firebase: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const registerDataHandler = (e) => {
        setRegisterData(oldState => ({ ...oldState, [e.target.id]: e.target.value }));
    };

    const errorHandler = (e) => {
        switch (e.target.id) {
            case 'email':
                setErrors(oldState => ({ ...oldState, email: checkUserEmail(registerData) }));
                break;
            case 'password':
            case 'rePassword':
                setErrors(oldState => ({ ...oldState, [e.target.id]: checkUserPasswords(registerData) }));
                break;
            default:
                break;
        }
    };

    const registerHandler = (e) => {
        e.preventDefault();
        const isValid = finalValidation(errors);

        if (!isValid.email || !isValid.password) {
            errors.firebase = '';
            return;
        }
        registerUser(registerData)
            .then(() => navigateToHome())
            .catch(err => setErrors(oldState => ({ ...oldState, firebase: err.code.split('/')[1] })));
    };

    return (
        <Form className="AuthForm" onSubmit={(e) => registerHandler(e)}>
            {errors.firebase && <Form.Text className="Error">{errors.firebase}</Form.Text>}

            <Form.Group className="mb-3" controlId="email" onChange={registerDataHandler} onBlur={(e) => errorHandler(e)}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                {errors.email && <Form.Text className="Error">{errors.email}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password" onChange={registerDataHandler} onBlur={(e) => errorHandler(e)} >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                {errors.password && <Form.Text className="Error">{errors.password}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="rePassword" onChange={registerDataHandler} onBlur={(e) => errorHandler(e)}>
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