import { useEffect, useState } from 'react';

import { RiArrowRightLine } from 'react-icons/ri';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { UserGameCard } from "./user-game-card/UserGameCard";
import Transition from '../utils/Transition';
import Button from '../utils/Button';
import Loading from '../utils/Loading';
import { getGamesFromUserLibrary } from '../../services/userServices';
import { getGameById } from '../../services/gamesServices';
import { useAuthContext } from '../../custom-hooks/userHooks';
import { SearchBar } from '../utils/Searchbar';
import { cardDuration, cycleArray } from '../../services/utilServices';


export const UserLibrary = () => {
    const [allGames, setAllGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentGames, setCurrentGames] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [message, setMessage] = useState('');

    const { user } = useAuthContext();

    const navigateTo = useNavigate();
    const [searchParams] = useSearchParams();
    const searchWord = searchParams.get('search') || '';

    const gamesPerPage = 3;
    const gamesDisplayed = currentPage * gamesPerPage;

    useEffect(() => {
        if (user) {
            (async () => {
                try {
                    const userGameList = await getGamesFromUserLibrary(user.uid);

                    if (!userGameList.games || userGameList.games.length < 1) {
                        setMessage('There are still no games in your library...');
                    } else {
                        const allUserGames = await Promise.all(userGameList.games
                            .reverse()
                            .map(g => getGameById(g.id)));

                        setPageCount(Math.ceil(userGameList.games.length / gamesPerPage));
                        setAllGames(() => allUserGames);
                    }
                } catch (error) {
                    setAllGames(null);
                }
                setIsLoading(false);
            })();
        }
    }, [user]);

    useEffect(() => {
        if (allGames && allGames.length > 0) {
            setCurrentGames(() => allGames.slice(gamesDisplayed, gamesDisplayed + gamesPerPage));
        }
    }, [allGames, gamesDisplayed]);

    useEffect(() => {
        let interval;

        if (currentGames.length > 1) {
            interval = setInterval(() => {
                setCurrentGames((oldState) => cycleArray(oldState));
            }, cardDuration * 1000);
        }
        return () => clearInterval(interval);

    }, [currentGames]);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        if (searchWord !== '') {
            const filteredGames = allGames
                .filter((game) => game.name.toLowerCase().includes(searchWord.toLowerCase()));

            setMessage(`No such game found in your library...`);
            setCurrentGames(() => filteredGames);
            setPageCount(Math.ceil(filteredGames.length / 3));
        } else if (allGames) {
            setCurrentGames(() => allGames.slice(gamesDisplayed, gamesDisplayed + gamesPerPage));
            setPageCount(Math.ceil(allGames.length / 3));
        }
    }, [searchWord, allGames, gamesDisplayed]);

    return (
        !isLoading
            ? allGames === null
                ? <h1 className="NotFound">Server is down &#128542; <p>Please try again later</p> </h1>
                : <Transition className="Home" direction="left">
                    {allGames.length > 0 && <SearchBar />}

                    {currentGames.length > 0
                        ? < Transition className="Grid">
                            {currentGames.map((game, i) => (
                                <UserGameCard
                                    key={game.id}
                                    game={game}
                                    duration={cardDuration}
                                    big={i === 0}
                                />
                            ))}
                            <ReactPaginate
                                previousLabel='Previous Page'
                                nextLabel='Next Page'
                                pageCount={pageCount}
                                onPageChange={changePage}
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
                            <Button className="Store" handleClick={() => navigateTo('/')}>
                                Go to Catalog <RiArrowRightLine />
                            </Button>
                        </Transition>
                        : <h1 className='NotFound' >
                            <p>{message}&#128542;</p>
                            <Button className="Store" handleClick={() => navigateTo('/')}>
                                You can check our Catalog <RiArrowRightLine />
                            </Button>
                        </h1>
                    }
                </Transition >
            : <Loading />
    );
};

export default UserLibrary;