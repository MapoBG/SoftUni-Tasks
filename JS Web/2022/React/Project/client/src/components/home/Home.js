import { useEffect } from "react";
import { useState } from "react"

import * as gameServices from '../../services/gamesServices';
import Loading from "../utils/Loading";

export const Home = () => {
    const [allGames, setGames] = useState([]);

    // useEffect(() => {
    //     gameServices.getAll()
    //         .then(result => setGames(result.results))
    // }, [])

    return (
        allGames.length === 0
            ? <Loading />
            : allGames.map(g => <li key={g.id}>{g.name}</li>)
    );
};