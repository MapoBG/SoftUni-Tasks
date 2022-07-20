import { baseUrl } from "../env/constants";

const gamesUrl = baseUrl + '/games';

export const getAll = () => {
    return fetch(gamesUrl)
        .then(res => res.json())
};