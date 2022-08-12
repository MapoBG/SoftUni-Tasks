import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { useAuthContext } from "../../custom-hooks/userHooks";
import * as gameServices from '../../services/gamesServices';
import { getGamesFromUserLibrary } from "../../services/userServices";
import Loading from "../utils/Loading";
import Transition from "../utils/Transition";
import { GameCard } from "./game-card/GameCard";
import { SearchBar } from "../utils/Searchbar";

export const Home = () => {
    const [searchParams] = useSearchParams();
    const searchWord = searchParams.get('search') || '';
    const pageNumber = searchParams.get('page') || 1;

    const [gamesObj, setGamesObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [userGameList, setUserGameList] = useState({});
    const [pageCount, setPageCount] = useState(Math.ceil(gamesObj?.count / 20) || 0);
    const [currentGames, setCurrentGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(Number(pageNumber));
    const [message, setMessage] = useState('');

    const { user } = useAuthContext();

    const navigateTo = useNavigate();
    const gamesPerPage = 20;

    useEffect(() => {
        setIsLoading(true);

        if (searchWord !== '') {
            setMessage(`No such game found in our data base...`);
        }

        gameServices.getNewPage(pageNumber, searchWord)
            .then(data => {
                setGamesObj(() => data);
                setCurrentGames(() => data.results || []);
                setPageCount(Math.ceil(data.count / gamesPerPage) || 0);
                setCurrentPage(pageNumber);
                setIsLoading(false);
            })
            .catch(() => {
                setGamesObj(null);
                setIsLoading(false);
            });
    }, [searchWord, pageNumber]);

    useEffect(() => {
        if (user) {
            (async () => {
                const userGames = await getGamesFromUserLibrary(user.uid);
                setUserGameList(userGames);
            })();
        }
    }, [user]);

    const changePage = ({ selected }) => {
        setIsLoading(true);
        setCurrentPage(selected + 1);

        if (searchWord) {
            return navigateTo(`?page=${selected + 1}&search=${searchWord}`);
        }

        navigateTo(`?page=${selected + 1}`);
    };
    const changeSearchPage = () => setCurrentPage(1);

    return (
        isLoading
            ? <Loading />
            : gamesObj === null
                ? <h1 className="NotFound">Server is down &#128542; <p>Please try again later</p> </h1>
                : currentGames.length > 0
                    ? <>
                        < SearchBar changePage={changeSearchPage} />
                        <Transition className="grid-container">
                            {currentGames.map(g => <div className="Column" key={g.id}><GameCard game={g} userGameList={userGameList.games} /></div>)}
                        </Transition>
                        <ReactPaginate
                            previousLabel='Previous Page'
                            nextLabel='Next Page'
                            pageCount={pageCount}
                            onPageChange={changePage}
                            forcePage={currentPage - 1}
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
                    </>
                    : <>
                        < SearchBar changePage={changeSearchPage} />
                        <h1 className='NotFound' >
                            <p>{message}&#128542;</p>
                        </h1>
                    </>
    );
};