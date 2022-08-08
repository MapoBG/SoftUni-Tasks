import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../api/firebase"


export const addToUserLibrary = async (userId, gameId) => {
    try {
        const userRef = doc(firebaseDB, `usersGames`, userId);
        setDoc(userRef, { latestGameAdded: gameId }, { merge: true });

        await updateDoc(userRef, { games: arrayUnion({ id: gameId }) });
    } catch (error) {
        console.log(error);
    }
};

export const getGamesFromUserLibrary = async (userId) => {
    const userRef = doc(firebaseDB, `usersGames`, userId);
    const dbDocument = await getDoc(userRef);

    if (dbDocument.exists()) {
        return dbDocument.data();
    } else {
        return {};
    }
};

export const removeGame = async (userId, gameId) => {
    const userRef = doc(firebaseDB, `usersGames`, userId);

    await updateDoc(userRef, { games: arrayRemove({ id: gameId }) });
};