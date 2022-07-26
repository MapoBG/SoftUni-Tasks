import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BackgroundImage } from 'react-image-and-background-image-fade';
// import NavBar from '../../components/NavBar';
import { RiAddLine, RiCheckLine } from 'react-icons/ri';
import { getGameById } from '../../services/gamesServices';
import Info from './game-info/GameInfo';
import Transition from '../utils/Transition';
import Button from '../utils/Button';
import Loading from '../utils/Loading';
import Carousel from './carousel/Carousel';
// import getPrice from '../../utils/getPrice';


function GameDetails({ cartItems=[], addToCart }) {
    const params = useParams();
    const gameId = Number(params.gameId);
    const [game, setGame] = useState(null);

    useEffect(() => {
        getGameById(gameId)
            .then(result => setGame(result));
    }, [gameId]);

    return (
        <Transition className="GameDetails" direction="left">
            {/* <NavBar showStoreButton title={game?.name} /> */}
            {game
                ? <Transition className="Grid">
                    <Carousel duration={6}>
                        {game.short_screenshots.map((screenshot) => (
                            <div
                                key={`img-${screenshot.id}`}
                                className="Image"
                            >
                                <BackgroundImage
                                    className="BackgroundImage"
                                    wrapperClassName="Wrapper"
                                    src={screenshot.image}
                                    transitionTime="1s"
                                    isResponsive
                                    lazyLoad
                                />
                            </div>
                        ))}
                    </Carousel>
                    <Info game={game} />
                    <div className="Price">
                        ${game.price}
                        {cartItems.find((item) => item.id === gameId)
                            ? <Transition className="Added">
                                Added <RiCheckLine />
                            </Transition>
                            : <Button handleClick={() => addToCart(game)}>
                                Add to cart <RiAddLine />
                            </Button>
                        }
                    </div>
                </Transition>
                : <Loading />
            }
        </Transition>
    );
}

export default GameDetails;
