import { useEffect, useState } from 'react';

import { getOne } from '../../services/petsServices';

const PetDetails = ({ match }) => {
    let [pet, setPet] = useState({});
    useEffect(() => {
        getOne(match.params.petId)
            .then(res => setPet(res));
    }, [match]);

    return (
        <section class="detailsOtherPet">
            <h3>{pet.name}</h3>
            <p>Pet counter: {pet.likes} <a href="/pet"><button class="button"><i class="fas fa-heart"></i>
                    Pet</button></a>
            </p>
            <p class="img"><img src={pet.imageURL} alt="" /></p>
            <p class="description">{pet.description}</p>
        </section>
    );
};

export default PetDetails;