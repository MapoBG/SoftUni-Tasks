import { useEffect, useState } from 'react';

import { RiArrowRightLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { UserGameCard } from "./user-game-card/UserGameCard";
import Transition from '../utils/Transition';
import Button from '../utils/Button';
import Loading from '../utils/Loading';
import { getGamesFromUserLibrary } from '../../services/userServices';
import { getGameById } from '../../services/gamesServices';
import { useAuthContext } from '../../custom-hooks/userHooks';


const cardDuration = 5;
const cycleArray = (games) => {
    const newArray = [...games];
    newArray.push(newArray.shift());

    return newArray;
};

export const UserLibrary = () => {
    const [userGames, setUserGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthContext();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (user) {
            let interval;

            (async () => {
                const userGameList = await getGamesFromUserLibrary(user.uid);

                if (!userGameList.games || userGameList.games.length < 1) {
                    setIsLoading(false);
                    return null;
                } else {
                    const allUserGames = await Promise.all(userGameList.games.map(g => getGameById(g.id)));
                    setUserGames(() => allUserGames);

                    interval = setInterval(() => {
                        if (allUserGames.length > 1) {
                            setUserGames((oldState) => cycleArray(oldState));
                        }
                    }, cardDuration * 1000);
                    setIsLoading(false);
                }
            })();

            return () => clearInterval(interval);
        }
    }, [user]);

    return (
        !isLoading
            ? <Transition className="Home" direction="left">
                {userGames.length > 0
                    ? < Transition className="Grid">
                        {userGames.map((game, i) => (
                            <UserGameCard
                                key={game.id}
                                game={game}
                                userGameList={userGames}
                                duration={cardDuration}
                                big={i === 0}
                            />
                        ))}
                        <ReactPaginate
                            previousLabel='Previous Page'
                            nextLabel='Next Page'
                            pageCount={5}
                            // onPageChange={changePage}
                            // forcePage={currentPage - 1}
                            renderOnZeroPageCount={null}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                        />
                        <Button
                            className="Store"
                            handleClick={() => navigateTo('/')}
                        >
                            Go to Catalog <RiArrowRightLine />
                        </Button>
                    </Transition>
                    : <h1 className='NotFound' >
                        <p>There are still no games in your library... &#128542;</p>
                        <Button
                            className="Store"
                            handleClick={() => navigateTo('/')}
                        >
                            You can check our Catalog <RiArrowRightLine />
                        </Button>
                    </h1>
                }
            </Transition >
            : <Loading />
    );
};

export default UserLibrary;