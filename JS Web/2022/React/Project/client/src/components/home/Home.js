import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { useAuthContext } from "../../custom-hooks/userHooks";
import * as gameServices from '../../services/gamesServices';
import { getGamesFromUserLibrary } from "../../services/userServices";
import Loading from "../utils/Loading";
import Transition from "../utils/Transition";
import { GameCard } from "./game-card/GameCard";

export const Home = () => {
    const [gamesObj, setGamesObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [userGameList, setUserGameList] = useState({});

    const { user } = useAuthContext();

    const params = useParams();
    const currentPage = Number(params.pageNumber) || 1;

    const navigateTo = useNavigate();

    useEffect(() => {
        if (user) {
            (async () => {
                const userGames = await getGamesFromUserLibrary(user.uid);
                setUserGameList(userGames);
            })();
        }
    }, [user]);

    useEffect(() => {
        gameServices.getNewPage(currentPage)
            .then(result => {
                setGamesObj(result);
                setIsLoading(false);
            })
            .catch(() => {
                setGamesObj(null);
                setIsLoading(false);
            });
    }, [currentPage]);

    const pageCount = Math.ceil(gamesObj?.count / 20);

    const changePage = ({ selected }) => {
        setIsLoading(true);
        navigateTo(`/page=${selected + 1}`);
    };

    return (
        isLoading
            ? <Loading />
            : gamesObj === null
                ? <h1 className="NotFound">Server is down &#128542; <p>Please try again later</p> </h1>
                : <>
                    <Transition className="grid-container">
                        {gamesObj.results.map(g => <div className="Column" key={g.id}><GameCard game={g} userGameList={userGameList.games} /></div>)}
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
    );
};