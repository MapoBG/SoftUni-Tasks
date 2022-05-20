import { useEffect, useState } from 'react';

import { getOne, updatePetDescr } from '../../services/petsServices';

const PetEdit = ({ match, history }) => {
    let [pet, setPet] = useState({});

    useEffect(() => {
        getOne(match.params.petId)
            .then(res => setPet(res));
    }, [match]);

    const updateDescription = (e) => {
        e.preventDefault();
        updatePetDescr(e.target, match.params.petId)
            .then(() => history.push("/catalog/details/" + match.params.petId));
    };

    return (
        <section className="detailsMyPet">
            <h3>{pet.name}</h3>
            <p>Pet counter: <i className="fas fa-heart"></i> {pet.likes}</p>
            <p className="img"><img
                src={pet.imageURL} alt="" /></p>
            <form onSubmit={updateDescription}>
                <textarea type="text" name="description" defaultValue={pet.description}></textarea>
                <button className="button"> Save</button>
            </form>
        </section>
    );
};

export default PetEdit;