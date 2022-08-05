import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BackgroundImage } from 'react-image-and-background-image-fade';
// import NavBar from '../../components/NavBar';
import { RiAddLine, RiCheckLine } from 'react-icons/ri';
import { getGameById } from '../../services/gamesServices';
import GameInfo from './game-info/GameInfo';
import Transition from '../utils/Transition';
import Button from '../utils/Button';
import Loading from '../utils/Loading';
import Carousel from './carousel/Carousel';
import { addToUserLibrary, getItemsFromUserLibrary } from '../../services/userServices';
import { AuthContext } from '../../contexts/authContext';


const GameDetails = () => {
    const params = useParams();
    const gameId = Number(params.gameId);

    const { user } = useContext(AuthContext);
    const [game, setGame] = useState(null);
    const [libraryItems, setLibraryItems] = useState([]);

    useEffect(() => {
        if (user) {
            getItemsFromUserLibrary(user.uid)
                .then(data => setLibraryItems(data));
        }
    }, [user])

    useEffect(() => {
        getGameById(gameId)
            .then(result => setGame(result));
    }, [gameId]);

    const addToUserLibraryAndState = () => {
        addToUserLibrary(user?.uid, gameId)
            .then(() => setLibraryItems(oldState => ({ ...oldState, games: [...oldState.games, gameId] })))
            .catch(err => console.log(err))
    }

    return (
        <Transition className="GameDetails" direction="left">
            {/* <NavBar showStoreButton title={game?.name} /> */}
            {game
                ? <Transition className="Grid">
                    <Carousel duration={6}>
                        {game.short_screenshots.map((screenshot) => (
                            <div
                                key={`img-${screenshot.id}`}
                                className="Image"
                            >
                                <BackgroundImage
                                    className="BackgroundImage"
                                    wrapperClassName="Wrapper"
                                    src={screenshot.image}
                                    transitionTime="1s"
                                    isResponsive
                                    lazyLoad
                                />
                            </div>
                        ))}
                    </Carousel>
                    <GameInfo game={game} />

                    {user && <div className="Price">
                        {libraryItems.games.find((item) => item === gameId)
                            ? <Transition className="Added">
                                Already in Library <RiCheckLine />
                            </Transition>
                            : <Button handleClick={addToUserLibraryAndState}>
                                Add to Library <RiAddLine />
                            </Button>
                        }
                    </div>
                    }
                </Transition>
                : <Loading />
            }
        </Transition>
    );
}

export default GameDetails;
