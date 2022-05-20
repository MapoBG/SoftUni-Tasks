

import { Component } from 'react';
import { createPet } from '../../services/petsServices';

class AddPet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            property: [],
        };
    };

    onSubmitHandler(e, props) {
        e.preventDefault();
        createPet(e.target)
            .then(props.history.push("/"));
    }

    render() {
        return (
            <section className="create">
                <form onSubmit={((e) => this.onSubmitHandler(e, this.props))}>
                    <fieldset>
                        <legend>Add new Pet</legend>
                        <p className="field">
                            <label htmlFor="name">Name</label>
                            <span className="input">
                                <input type="text" name="name" id="name" placeholder="Name" />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="description">Description</label>
                            <span className="input">
                                <textarea rows="4" cols="45" type="text" name="description" id="description"
                                    placeholder="Description"></textarea>
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="image">Image</label>
                            <span className="input">
                                <input type="text" name="imageURL" id="image" placeholder="Image" />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="category">Category</label>
                            <span className="input">
                                <select type="text" name="category">
                                    <option value="Cat">Cat</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Parrot">Parrot</option>
                                    <option value="Reptile">Reptile</option>
                                    <option value="Other">Other</option>
                                </select>
                                <span className="actions"></span>
                            </span>
                        </p>
                        <input className="button submit" type="submit" value="Add Pet" />
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default AddPet;