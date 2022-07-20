import { baseUrl } from "../env/constants"

const commentsUrl = baseUrl + '/comments'

export const createComment = (gameId, comment) => {
    return fetch(commentsUrl, {
        method: 'POST',
        body: { gameId, comment }
    })
        .then(res => res.json())
}