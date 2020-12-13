function solve(input) {
    let currentLine = input.shift();
    let petersBlog = {};

    let commands = {
        New_follower(petersBlog, userName) {
            if (!petersBlog[userName]) {
                petersBlog[userName] = { likes: 0, comments: 0 };
            }
        },

        Like(petersBlog, userName, likes) {
            if (!petersBlog[userName]) {
                petersBlog[userName] = { likes, comments: 0 };
            } else {
                petersBlog[userName].likes += likes;
            }

        },

        Comment(petersBlog, userName) {
            if (!petersBlog[userName]) {
                petersBlog[userName] = { likes: 0, comments: 1 };
            } else {
                petersBlog[userName].comments += 1;
            }
        },

        Blocked(petersBlog, userName) {
            if (!petersBlog[userName]) {
                console.log(`${userName} doesn't exist.`);
                return;
            }

            delete petersBlog[userName];
        },
    };

    while (currentLine != "Log out") {
        let [command, userName, likes] = currentLine.split(":");
        command = command.replace(" ", "_");
        likes = Number(likes);
        userName = userName.trim();

        commands[command](petersBlog, userName, likes);
        currentLine = input.shift();
    };

    let followers = Object.keys(petersBlog);
    console.log(`${followers.length} followers`);
    followers.sort((f1, f2) => {
        let scoreF2 = petersBlog[f2].likes + petersBlog[f2].comments;
        let scoreF1 = petersBlog[f1].likes + petersBlog[f1].comments;
        return scoreF2 - scoreF1 || f1.localeCompare(f2);
    })
        .forEach(person => {
            let score = petersBlog[person].likes + petersBlog[person].comments;
            console.log(`${person}: ${score}`);
        })
};

solve([
    'New follower: gosho',
    'Like: gosho: 5',
    'Comment: gosho',
    'New follower: gosho',
    'New follower: tosho',
    'Comment: gosho',
    'Comment: tosho',
    'Comment: pesho',
    'Log out'
]);

console.log("-----");

solve([
    'Like: A: 3',
    'Comment: A',
    'New follower: B',
    'Blocked: A',
    'Comment: B',
    'Like: C: 5',
    'Like: D: 5',
    'Log out'
]);