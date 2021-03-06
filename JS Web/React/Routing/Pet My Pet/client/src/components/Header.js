import { NavLink, Link } from 'react-router-dom';

const Header = () => {
    return (
        <header id="site-header">
            <nav className="navbar">

                <section className="navbar-dashboard">
                    <div className="first-bar">
                        <Link to="/catalog">Pets Catalog</Link>
                        <NavLink className="button" to="/catalog/my-pets">My Pets</NavLink>
                        <NavLink className="button" to="/catalog/add-pet">Add Pet</NavLink>
                    </div>
                    <div className="second-bar">
                        <ul>
                            <li>Welcome!</li>
                            <li><Link to="#"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
                        </ul>
                    </div>
                </section>
                <section className="navbar-anonymous">
                    <ul>
                        <li><NavLink to="/register"><i className="fas fa-user-plus"></i> Register</NavLink></li>
                        <li><NavLink to="/login"><i className="fas fa-sign-in-alt"></i> Login</NavLink></li>
                    </ul>
                </section>
                <style jsx="true">{`
            .active {
                background-color: rgb(248 215 107) !important;
                color: black !important;
            }
            `}</style>
            </nav>
        </header>
    );
}

export default Header;