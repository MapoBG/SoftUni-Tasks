import api from "../api/constants"

export const getAll = () => {
    return fetch(api.url + api.key)
        .then(res => res.json());
};

export const getGameById = async (gameId) => {
    const res = await fetch(api.url + `/${gameId}` + api.key);
    const result = await res.json();

    result.short_screenshots = await getScreenshots(gameId);
    result.short_screenshots.unshift({ id: 10001, image: result.background_image });

    return result;
};

export const getNewPage = async (pageNum, searchWord) => {
    const page = pageNum ? `&page=${pageNum}` : '';
    const searchQuery = searchWord ? `&search=${searchWord}` : '';

    const res = await fetch(api.url + api.key + page + searchQuery);
    const result = await res.json();

    return result;
};

const getScreenshots = (gameId) => {
    return fetch(api.url + `/${gameId}/screenshots` + api.key)
        .then(res => res.json())
        .then(data => data.results);
};