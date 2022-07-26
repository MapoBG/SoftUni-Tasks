import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundImage } from 'react-image-and-background-image-fade';
import {
    RiGlobalLine,
    RiWindowsFill,
    RiAndroidFill,
    RiPlaystationFill,
    RiXboxFill,
    RiAppleFill,
    RiAddLine,
    RiCheckLine,
} from 'react-icons/ri';
import { SiIos, SiLinux, SiNintendoswitch, } from 'react-icons/si';
import Transition from '../../utils/Transition';
import { useNavigate } from 'react-router-dom';
import Button from '../../utils/Button';


const platformIcons = {
    web: <RiGlobalLine />,
    pc: <RiWindowsFill />,
    android: <RiAndroidFill />,
    ios: <SiIos />,
    playstation: <RiPlaystationFill />,
    xbox: <RiXboxFill />,
    mac: <RiAppleFill />,
    linux: <SiLinux />,
    nintendo: <SiNintendoswitch />,
};


export const GameCard = (props) => {
    const { game, cartItems, addToCart } = props;
    const releasedDate = new Date(game.released).toLocaleDateString();
    const genreList = game.genres.map(({ name }) => name).join(', ');
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const navigateToGame = () => navigate(`/games/${game.id}`);

    return (
        <div className="GameCard">
            <motion.div
                className="Image"
                whileHover={{ height: 180 }}
                onClick={navigateToGame}
            >
                <BackgroundImage
                    className="BackgroundImage"
                    wrapperClassName="Wrapper"
                    src={game.background_image || ''}
                    transitionTime="1s"
                    isResponsive
                    lazyLoad
                />
            </motion.div>
            <motion.div
                className="Info"
                whileHover={{ height: 180 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className="Price">
                    {cartItems.find((item) => item.id === game.id)
                        ? <Transition className="Added">Added <RiCheckLine /></Transition>
                        : <Button handleClick={() => addToCart(game)}>
                            Add to cart <RiAddLine />
                        </Button>
                    }
                    ${game.price}
                </div>
                <Button className="Name" handleClick={navigateToGame}>
                    {game.name}
                </Button>
                <AnimatePresence>
                    {isHovered && (
                        <Transition className="MoreInfo">
                            {game.parent_platforms && <div className="Platforms">
                                {game.parent_platforms.map(({ platform }) => (
                                    <div key={`${platform.id}-${game.id}`} title={platform.name}>
                                        {platformIcons[platform.slug]}
                                    </div>
                                ))}
                            </div>}
                            <div className="Released">Released: {releasedDate}</div>
                            <div className="Genres">Genres: {genreList}</div>
                        </Transition>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
