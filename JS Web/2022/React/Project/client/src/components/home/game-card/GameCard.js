import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundImage } from 'react-image-and-background-image-fade';
import {
    RiGlobalLine,
    RiWindowsFill,
    RiAndroidFill,
    RiPlaystationFill,
    RiXboxFill,
    RiAppleFill,
    RiCheckLine,
} from 'react-icons/ri';
import { SiIos, SiLinux, SiNintendoswitch, } from 'react-icons/si';
import Transition from '../../utils/Transition';
import { useNavigate } from 'react-router-dom';
import Button from '../../utils/Button';
import { useAuthContext } from '../../../custom-hooks/userHooks';


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

export const GameCard = ({ game, userGameList }) => {
    let [gamesinUserList, setGamesInUserList] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const { user } = useAuthContext();

    const navigate = useNavigate();
    const navigateToGame = () => navigate(`/game-details/${game.id}`);

    const releasedDate = new Date(game.released).toLocaleDateString();
    const genreList = game.genres.map(({ name }) => name).join(', ');

    useEffect(() => {
        if (user) {
            (async () => {
                setGamesInUserList(() => userGameList.games?.some(g => g.id === game.id));
            })();
        }
    }, [user, game.id, userGameList])

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
                <Button className="Name" handleClick={navigateToGame}>
                    {game.name}
                </Button>

                {(user && gamesinUserList)
                    && <Transition className="Added">
                        Already in Your Library <RiCheckLine />
                    </Transition>
                }
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