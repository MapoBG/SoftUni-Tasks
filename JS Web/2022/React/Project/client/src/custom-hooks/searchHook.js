import { useEffect, useState } from "react";


export const useSearch = (allGames = [], currentPage, gamesPerPage, searchWord, totalGames = 0) => {
    const [message, setMessage] = useState('');
    const [currentGames, setCurrentGames] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const gamesDisplayed = currentPage * gamesPerPage;

    useEffect(() => {
        if (searchWord !== '') {
            const filteredGames = allGames.filter((game) => game.name.toLowerCase().includes(searchWord.toLowerCase()));

            setMessage(`No such game found in your library...`);
            setCurrentGames(() => filteredGames);
            setPageCount(Math.ceil(filteredGames.length / gamesPerPage));
        } else {
            setCurrentGames(() => allGames.slice(gamesDisplayed, gamesDisplayed + gamesPerPage));
            setPageCount(Math.ceil(totalGames / gamesPerPage));
        }
    }, [searchWord, allGames, gamesDisplayed, gamesPerPage, totalGames]);

    return { message, currentGames, pageCount };
}