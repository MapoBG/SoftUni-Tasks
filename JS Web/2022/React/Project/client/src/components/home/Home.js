import { useState, useEffect } from "react";

import * as gameServices from '../../services/gamesServices';
import Loading from "../utils/Loading";
import Transition from "../utils/Transition";
import { GameCard } from "./game-card/GameCard";

export const Home = () => {
    const [allGames, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        gameServices.getAll()
            .then(result => {
                setGames(result.results);
                setIsLoading(false);
            })
    }, []);

    return (
        isLoading
            ? <Loading />
            : allGames.length === 0
                ? <h2 style={{ color: 'white', margin: 'auto', }}>Server is down &#128542; <h5>Please try again later</h5> </h2>
                : <Transition className="grid-container">
                    {allGames.map(g => <div className="Column" key={g.id}><GameCard game={g} cartItems={[]} /></div>)}
                </Transition>
    );
};