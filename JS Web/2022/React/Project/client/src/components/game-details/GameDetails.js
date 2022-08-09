import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BackgroundImage } from 'react-image-and-background-image-fade';
import { RiAddLine, RiCheckLine, RiDeleteBinLine } from 'react-icons/ri';

import { getGameById } from '../../services/gamesServices';
import { GameInfo } from './game-info/GameInfo';
import Transition from '../utils/Transition';
import Button from '../utils/Button';
import Loading from '../utils/Loading';
import Carousel from './carousel/Carousel';
import { addToUserLibrary, getGamesFromUserLibrary, removeGame } from '../../services/userServices';
import { useAuthContext } from '../../custom-hooks/userHooks';


const GameDetails = () => {
    const params = useParams();
    const gameId = Number(params.gameId);

    const [game, setGame] = useState(null);
    const [libraryItems, setLibraryItems] = useState({});
    const { user } = useAuthContext();

    useEffect(() => {
        if (user) {
            getGamesFromUserLibrary(user.uid)
                .then(data => setLibraryItems(data))
                .catch(err => console.log(err));
        }

        getGameById(gameId)
            .then(result => setGame(result))
            .catch(err => console.log(err));

    }, [gameId, user]);

    const addToUserLibraryAndState = () => {
        addToUserLibrary(user.uid, gameId)
            .then(() => setLibraryItems(oldState => ({ ...oldState, games: [{ id: gameId }] })))
            .catch(err => console.log(err));
    };

    const removeFromUserLibraryAndState = () => {
        removeGame(user.uid, gameId)
            .then(() => setLibraryItems(oldState => {
                const filteredGames = oldState.games.filter(g => g.id !== gameId);
                return filteredGames;
            }))
            .catch(err => console.log(err));
    };

    return (
        <Transition className="GameDetails" direction="left">
            {game
                ? <Transition className="Grid">
                    <Carousel duration={5}>
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

                    {user &&
                        <div className="Price">
                            {libraryItems.games?.find((game) => game.id === gameId)
                                ? <>
                                    <Transition className="Added">
                                        In Library <RiCheckLine />
                                    </Transition>
                                    <Button handleClick={removeFromUserLibraryAndState}>
                                            Remove from Library <RiDeleteBinLine />
                                        </Button>
                                </>
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
};

export default GameDetails;
