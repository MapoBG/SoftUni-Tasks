import { baseUrl } from "../env/constants";

const baseGamesUrl = baseUrl + '/data/games';

export const getAll = () => {
    return fetch(baseGamesUrl)
        .then(res => res.json())
};