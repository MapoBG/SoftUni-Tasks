import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundImage } from 'react-image-and-background-image-fade';
import {
    RiGlobalLine,
    RiWindowsFill,
    RiAndroidFill,
    RiPlaystationFill,
    RiXboxFill,
    RiAppleFill,
    RiDeleteBinLine,
} from 'react-icons/ri';
import { SiIos, SiLinux, SiNintendoswitch, } from 'react-icons/si';
import Transition from '../../utils/Transition';
import { useNavigate } from 'react-router-dom';
import Button from '../../utils/Button';
import { AuthContext } from '../../../contexts/authContext';
import { useEffect } from 'react';
import { getItemsFromUserLibrary } from '../../../services/userServices';


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

export const GameCard = ({ game }) => {
    const { user } = useContext(AuthContext);
    const releasedDate = new Date(game.released).toLocaleDateString();
    const genreList = game.genres.map(({ name }) => name).join(', ');
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const navigateToGame = () => navigate(`/game-details/${game.id}`);
    let [inUserList, setInUserList] = useState(null);

    useEffect(() => {
        if (user) {
            (async () => {
                const data = await getItemsFromUserLibrary(user.uid);
                console.log(data);
                setInUserList(() => data.games?.some(g => g === game.id))
            })();
        }
    }, [user, game.id])
    // console.log(inUserList);
    return (
        <div className="GameCard">
            <motion.div
                className="Image"
                whileHover={{ height: 550 }}
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
                whileHover={{ height: 150 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}

            >
                {(user && inUserList) && <Button handleClick={() => (game)}>
                    Remove from Library <RiDeleteBinLine />
                </Button>}

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
};