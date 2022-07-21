import { useNavigate } from 'react-router-dom';
import Headroom from 'react-headroom';
import { RiGameFill } from 'react-icons/ri';
import Transition from '../utils/Transition';
import Button from '../utils/Button';
import SearchBar from '../utils/Searchbar';

function Header() {
    const navigate = useNavigate();
    const navigateToHome = () => navigate('/');

    return (
        <Headroom upTolerance={1}>
            <Transition
                className="Header"
                direction="down"
                distance={20}
            >
                <Button
                    className="Logo"
                    onClick={navigateToHome}
                >
                    <RiGameFill /> GameStore
                </Button>
                <SearchBar />
            </Transition>
        </Headroom>
    );
}

export default Header;