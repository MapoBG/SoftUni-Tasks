import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { RiArrowRightLine } from 'react-icons/ri';

import { GameCard } from '../home/game-card/GameCard';
import Transition from '../utils/Transition';
import Button from '../utils/Button';
import Loading from '../utils/Loading';
import { getItemsFromUserLibrary } from '../../services/userServices';
import { AuthContext } from '../../contexts/authContext';
import { getGameById } from '../../services/gamesServices';


const cardDuration = 5;
const cycleArray = (games) => {
    const newArray = [...games];
    newArray.push(newArray.shift());

    return { games: newArray };
};

export const UserLibrary = () => {
    const [userGames, setUserGames] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const navigateToHome = () => navigate('/');

    useEffect(() => {
        if (user) {
            let interval;
            (async () => {
                let addedGames = await getItemsFromUserLibrary(user.uid);

                if (!addedGames.games) {
                    addedGames.games = [];
                    setUserGames(addedGames);
                } else {
                    const games = await Promise.all(addedGames.games.map(g => getGameById(g)))
                    setUserGames(oldState => ({ games: games.reverse() }));

                    interval = setInterval(() => {
                        setUserGames(games => cycleArray(games.games));
                    }, cardDuration * 1000);
                }
            })();
            return () => clearInterval(interval);
        }
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        user
            ? <Transition className="Home" direction="left">
                {userGames.games
                    ? userGames.games.length > 0
                        ? < Transition className="Grid">
                            {userGames.games.map((game) => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    userGameList={userGames.games}
                                    duration={cardDuration}
                                // big={i === 0}
                                />
                            ))}
                            <Button
                                className="Store"
                                handleClick={navigateToHome}
                            >
                                Go to Catalog <RiArrowRightLine />
                            </Button>
                        </Transition>
                        : <p >Sorry - no games</p>
                    : <Loading />
                }
            </Transition >
            : <Loading />
    );
};

export default UserLibrary;