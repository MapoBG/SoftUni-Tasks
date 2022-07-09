import { getFormData } from "./utils";

const baseUrl = 'http://localhost:3005/api/users';

export const getAll = async () => {
    const res = await fetch(baseUrl);
    const result = await res.json();

    return result;
};

export const createUser = async (event, setFunction) => {
    const newUser = getFormData(event);
    console.log(newUser);
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    const result = await res.json();

    console.log(result);

    closeUserWindowHandler(setFunction);
};

export const openUserWindowHandler = (setFunction) => {
    setFunction(true);
};

export const closeUserWindowHandler = (setFunction) => {
    setFunction(false);
};