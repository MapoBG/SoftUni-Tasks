import { NavLink } from 'react-router-dom';

const CatalogNav = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><NavLink to="/catalog/all">All</NavLink></li>
                <li><NavLink to="/catalog/Cats">Cats</NavLink></li>
                <li><NavLink to="/catalog/Dogs">Dogs</NavLink></li>
                <li><NavLink to="/catalog/Parrots">Parrots</NavLink></li>
                <li><NavLink to="/catalog/Reptiles">Reptiles</NavLink></li>
                <li><NavLink to="/catalog/Other">Other</NavLink></li>
            </ul>

            <style jsx>{`
            .active {
                background-color: rgb(248 215 107) !important;
                color: black !important;
            }
            `}</style>
        </nav>
    );
};

export default CatalogNav;