import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { firebaseAuth } from "../api/firebase"

export const registerUser = async (userData) => {
    const response = await createUserWithEmailAndPassword(firebaseAuth, userData.email, userData.password);
    return response;
};

export const loginUser = async (userData) => {
    const response = await signInWithEmailAndPassword(firebaseAuth, userData.email, userData.password);
    return response;
};

export const logoutUser = async (userData) => {
    const response = await signOut(firebaseAuth);
    return response;
}