import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';


export const GameDetails = ({ games }) => {
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const { gameId } = useParams();

    const game = games.find(g => g._id === gameId) || [];

    const changeComment = (e) => {
        setComment(oldValue => e.target.value);
    };

    const addCommentHandler = (e) => {
        e.preventDefault();
        e.target.value = '';
        
        setAllComments(oldState => {
            const newState = [...oldState, comment];
            return newState
        })
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    {allComments.length > 0
                        ? <ul>
                            {allComments.map(c => <li className='comment'> <p>Content: {c}</p></li>)}
                        </ul>
                        : <p className="no-comment">No comments.</p>
                    }
                    <ul>
                        {/* list all comments for current game (If any) */}
                        {/* <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li className="comment">
                            <p>Content: The best game.</p>
                        </li> */}
                    </ul>
                    {/* Display paragraph: If there are no games in the database */}
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to={`/edit/${game._id}`} className="button">
                        Edit
                    </Link>
                    <Link to={`/delete/${game._id}`} className="button">
                        Delete
                    </Link>
                </div>
            </div>
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={(e) => changeComment(e)} />
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
        </section>
    );
};