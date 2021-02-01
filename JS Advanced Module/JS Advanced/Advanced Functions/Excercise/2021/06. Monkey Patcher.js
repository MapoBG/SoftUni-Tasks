solve = (() => {
    const commands = {
        upvote: (post) => post.upvotes++,
        downvote: (post) => post.downvotes++,
        score: (post) => {
            let { upvotes, downvotes } = post;
            let total = upvotes + downvotes;
            let balance = upvotes - downvotes;

            let rating = '';

            if (upvotes / total > 0.66) {
                rating = 'hot';
            } else if (balance >= 0 && (upvotes > 100 || downvotes > 100)) {
                rating = 'controversial';
            } else if (balance < 0) {
                rating = 'unpopular';
            }

            if (total < 10 || rating == '') {
                rating = 'new';
            }

            if (total > 50) {
                let obfuscated = Math.ceil(0.25 * Math.max(upvotes, downvotes));
                upvotes += obfuscated;
                downvotes += obfuscated;
            }

            return [upvotes, downvotes, balance, rating];
        }
    };

    return { call: (post, command) => commands[command](post) };
})();


var forumPost = {
    id: '1234',
    author: 'author name',
    content: 'these fields are irrelevant',
    upvotes: 4,
    downvotes: 5
};

// Under border case
var answer = solve.call(forumPost, 'score');
var expected = [4, 5, -1, 'new'];

// Past border case
solve.call(forumPost, 'downvote');
answer = solve.call(forumPost, 'score');
expected = [4, 6, -2, 'unpopular'];

solve.call(forumPost, 'upvote');
solve.call(forumPost, 'upvote');
answer = solve.call(forumPost, 'score');
expected = [6, 6, 0, 'new'];

// 38 Upvotes
for (let i = 0; i < 38; i++) {
    solve.call(forumPost, 'upvote');
}
answer = solve.call(forumPost, 'score');
expected = [44, 6, 38, 'hot'];

// Past obfuscation threshold
solve.call(forumPost, 'downvote');
answer = solve.call(forumPost, 'score');
expected = [55, 18, 37, 'hot'];


// Bellow hot threshold
forumPost.upvotes = 132;
forumPost.downvotes = 68;

answer = solve.call(forumPost, 'score');
expected = [165, 101, 64, 'controversial'];

// Past hot threshold
forumPost.upvotes = 133;

answer = solve.call(forumPost, 'score');
expected = [167, 102, 65, 'hot'];