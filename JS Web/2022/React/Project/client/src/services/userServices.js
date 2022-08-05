import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firebaseDB } from "../api/firebase"

export const registerUser = async (userData) => {
    const response = await createUserWithEmailAndPassword(firebaseAuth, userData.email, userData.password);
    return response;
};

export const loginUser = async (userData) => {
    const response = await signInWithEmailAndPassword(firebaseAuth, userData.email, userData.password);
    return response;
};

export const logoutUser = async () => {
    const response = await signOut(firebaseAuth);
    return response;
};

export const addToUserLibrary = async (userId, gameId) => {
    try {
        const userRef = doc(firebaseDB, `users`, userId);
        setDoc(userRef, { latestGameAdded: gameId }, { merge: true });

        await updateDoc(userRef, { games: arrayUnion(gameId) });
    } catch (error) {
        console.log(error);
    }
};

export const getItemsFromUserLibrary = async (userId) => {
    const userRef = doc(firebaseDB, `users`, userId);
    const dbDocument = await getDoc(userRef);

    if (dbDocument.exists()) {
        return dbDocument.data();
    } else {
        return {};
    }
}