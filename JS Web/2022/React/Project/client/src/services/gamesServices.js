import api from "../api/constants"

export const getAll = () => {
    return fetch(api.url + '/games?key=' + api.key)
        .then(res => res.json())
}