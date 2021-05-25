import api from './api';

const getAll = (query) => {
    query = (query && query !== 'all') ? `?category=${query}` : '';

    return fetch(api.pets + query.slice(0, query.length - 1))
        .then(res => res.json())
        .catch(err => console.log(err));
};

const getOne = (id) => {
    return fetch(api.pets + `/${id}`)
        .then(res => res.json())
        .catch(err => console.log(err));
};

const createPet = (form) => {
    const petInfo = {
        name: form.name.value,
        description: form.description.value,
        imageURL: form.imageURL.value,
        category: form.category.value,
        likes: 0,
    };

    return fetch(api.pets, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(petInfo)
    });
};

const updatePetDescr = (form, petId) => {
    const petDescr = {
        description: form.description.value
    };

    return fetch(api.pets + `/${petId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(petDescr)
    });
};

const updatePetLikes = (pet) => {
    const petDescr = {
        likes: ++pet.likes
    };

    return fetch(api.pets + `/${pet.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(petDescr)
    });
};

export { getAll, getOne, createPet, updatePetDescr, updatePetLikes };

