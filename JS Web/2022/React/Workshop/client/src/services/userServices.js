import { getFormData } from "./utils";

const baseUrl = 'http://localhost:3005/api/users';

export const getAll = async () => {
    const res = await fetch(baseUrl);
    const result = await res.json();

    return result;
};

export const getUserById = async (id) => {
    const res = await fetch(baseUrl + `/${id}`);
    const result = await res.json();

    return result.user;
}

export const createUser = async (event, setFunction) => {
    const newUser = getFormData(event);
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    const result = await res.json();

    closeUserWindowHandler(setFunction);

    return result;
};

export const editUser = async (event, setFunction, userId) => {
    const newUser = getFormData(event);
    const res = await fetch(baseUrl + `/${userId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    const result = await res.json();

    closeUserWindowHandler(setFunction);

    return result.user;
};

export const openUserWindowHandler = (setFunction) => {
    setFunction(true);
};

export const closeUserWindowHandler = (setFunction) => {
    setFunction(false);
};