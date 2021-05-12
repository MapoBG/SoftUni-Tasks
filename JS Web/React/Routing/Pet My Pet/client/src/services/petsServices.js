import api from './api';

const getAll = (query) => {
    query = (query && query !== 'all') ? `?category=${query}` : '';

    return fetch(api.pets + query.slice(0, query.length - 1))
        .then(res => res.json())
        .catch(err => console.log(err));
}

const getOne = (id) => {
    return fetch(api.pets + `/${id}`)
        .then(res => res.json())
        .catch(err => console.log(err));
}

export { getAll, getOne };