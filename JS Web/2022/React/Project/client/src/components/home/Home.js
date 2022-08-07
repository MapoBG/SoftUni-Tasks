import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/authContext";
import * as gameServices from '../../services/gamesServices';
import { getGamesFromUserLibrary } from "../../services/userServices";
import Loading from "../utils/Loading";
import Transition from "../utils/Transition";
import { GameCard } from "./game-card/GameCard";

export const Home = () => {
    const [allGames, setAllGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [userGameList, setUserGameList] = useState({});

    useEffect(() => {
        if (user) {
            (async () => {
                const userGames = await getGamesFromUserLibrary(user.uid);
                setUserGameList(userGames);
            })();
        }
    }, [user]);

    useEffect(() => {
        gameServices.getAll()
            .then(result => {
                setAllGames(result.results);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    return (
        isLoading
            ? <Loading />
            : allGames.length === 0
                ? <h1 className="NotFound">Server is down &#128542; <h3>Please try again later</h3> </h1>
                : <Transition className="grid-container">
                    {allGames.map(g => <div className="Column" key={g.id}><GameCard game={g} userGameList={userGameList} /></div>)}
                </Transition>
    );
};