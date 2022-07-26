import api from "../api/constants"

export const getAll = () => {
    return fetch(api.url + '/games?key=' + api.key)
        .then(res => res.json())
};


export const getGameById = async (gameId) => {
    const res = await fetch(api.url + `/games/${gameId}?key=` + api.key);
    const result = await res.json();

    result.short_screenshots = await getScreenshots(gameId);
    result.short_screenshots.push(result.background_image)
    return result;
};

const getScreenshots = (gameId) => {
    return fetch(api.url + `/games/${gameId}/screenshots?key=` + api.key)
        .then(res => res.json())
        .then(data => data.results)
};