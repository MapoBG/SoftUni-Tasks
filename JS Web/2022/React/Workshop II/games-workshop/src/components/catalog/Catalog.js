import { GameItem } from "./game-item/GameItem";

export const Catalog = ({ games }) => {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {/* Display div: with information about every game (if any) */}
            {/* Display paragraph: If there is no games  */}
            {games.length > 0
                ? games.map(game => <GameItem key={game._id} game={game} />)
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
};