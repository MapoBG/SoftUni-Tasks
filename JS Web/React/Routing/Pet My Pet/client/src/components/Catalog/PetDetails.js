import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getOne, updatePetLikes } from '../../services/petsServices';

const PetDetails = ({ match }) => {
    let [pet, setPet] = useState({});

    useEffect(() => {
        getOne(match.params.petId)
            .then(res => setPet(res));
    }, [match]);

    const petLike = () => {
        getOne(pet.id)
            .then(updatePetLikes)
            .then(res => res.json())
            .then(setPet);
    };

    return (
        <section className="detailsMyPet">
            <h3>{pet.name}</h3>
            <p>Pet counter: {pet.likes} <a><button onClick={petLike} className="button"><i className="fas fa-heart"></i>
                    Pet</button></a>
            </p>
            <p className="img"><img src={pet.imageURL} alt="" /></p>
            <p className="description">{pet.description}</p>
            <div className="pet-info">
                <Link to={`/catalog/edit/${pet.id}`}><button className="button">Edit</button></Link>
                <Link to="/"><button className="button">Delete</button></Link>
            </div>
        </section>
    );
};

export default PetDetails;