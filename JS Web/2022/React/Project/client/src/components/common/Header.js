import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Headroom from 'react-headroom';
import { RiGameFill } from 'react-icons/ri';
import Transition from '../utils/Transition';
import Button from '../utils/Button';
import { Nav } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';

function Header() {
    const navigate = useNavigate();
    const navigateToHome = () => navigate('/');
    const { user } = useContext(AuthContext);

    return (
        <Headroom upTolerance={1}>
            <Transition
                className="Header"
                direction="down"
                distance={20}
            >
                <Button className="Logo" handleClick={navigateToHome}>
                    <RiGameFill /> Games
                </Button>

                <Nav className='justify-content-end' >
                    {user
                        ? <>
                            <Nav.Link as={Link} to={`/user-profile/${user.uid}`}>{user.email.split('@')[0]}'s Game Library</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        </>
                        : <>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </>
                    }


                </Nav>
            </Transition>
        </Headroom>
    );
}

export default Header;