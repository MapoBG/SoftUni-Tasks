import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../api/firebase"


export const addToUserLibrary = async (userId, gameId) => {
    try {
        setDoc(userRefFunc(userId), { latestGameAdded: gameId }, { merge: true });

        await updateDoc(userRefFunc(userId), { games: arrayUnion({ id: gameId }) });
    } catch (error) {
        return error;
    }
};

export const getGamesFromUserLibrary = async (userId) => {
    const dbDocument = await getDoc(userRefFunc(userId));

    if (dbDocument.exists()) {
        return dbDocument.data();
    } else {
        return {};
    }
};

export const removeGame = async (userId, gameId) => {
    await updateDoc(userRefFunc(userId), { games: arrayRemove({ id: gameId }) });
};

const userRefFunc = (userId) => {
    return doc(firebaseDB, `usersGames`, userId);
}