import { Component } from 'react';
import { getAll } from '../../services/petsServices';

import CatalogNav from './CatalogNav';
import PetItem from './PetItem';

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pets: [],
            currentCategory: 'all'
        };
    }

    componentDidMount() {
        getAll()
            .then(data => this.setState({ pets: data }));
    }

    componentDidUpdate(prevProps) {
        const category = this.props.match.params.category;

        if (category !== prevProps.match.params.category) {
            getAll(category)
                .then(data => this.setState({ pets: data, currentCategory: category }));
        }
    }

    render() {
        return (
            <section className="dashboard" >
                <h1>Catalog</h1>
                <CatalogNav />
                <ul className="other-pets-list">
                    {this.state.pets.map(p => <PetItem key={p.id} data={p} />)}
                </ul>
            </section>
        );
    }
};

export default Catalog;