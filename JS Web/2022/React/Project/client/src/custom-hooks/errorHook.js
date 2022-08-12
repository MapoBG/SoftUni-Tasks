import { useState } from "react";
import { checkUserEmail, checkUserPassword, checkUserRePassword } from "../services/errorServices";


export const useError = (registerData) => {
    const [errors, setErrors] = useState({
        firebase: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const errorHandler = (e, firebaseError) => {
        const inputField = e ? e.target.id : 'firebase';
        
        switch (inputField) {
            case 'email':
                setErrors(oldState => ({ ...oldState, email: checkUserEmail(registerData) }));
                break;
            case 'password':
            case 'rePassword':
                setErrors(oldState => ({ ...oldState, password: checkUserPassword(registerData) }));
                setErrors(oldState => ({ ...oldState, rePassword: checkUserRePassword(registerData) }));
                break;
            case 'firebase':
                switch (firebaseError) {
                    case 'invalid-email':
                        setErrors(oldState => ({ ...oldState, email: checkUserEmail(registerData) }));
                        break;
                    case 'internal-error':
                        setErrors(oldState => ({ ...oldState, password: 'Invalid password' }));
                        break;
                    case 'wrong-password':
                        setErrors(oldState => ({ ...oldState, password: 'Invalid email or password' }));
                        break;
                    case 'email-already-in-use':
                        setErrors(oldState => ({ ...oldState, email: 'Email is already registered' }));
                        break;
                    case 'user-not-found':
                        setErrors(oldState => ({ ...oldState, email: 'User not found. Are you sure this is the correct email you used for registration?' }));
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    };

    const finalValidation = (userData) => {
        const errors = {
            email: checkUserEmail(userData),
            password: checkUserPassword(userData),
            rePassword: checkUserRePassword(userData)
        };
        setErrors(errors);
    };

    return { errors, errorHandler, finalValidation };
}