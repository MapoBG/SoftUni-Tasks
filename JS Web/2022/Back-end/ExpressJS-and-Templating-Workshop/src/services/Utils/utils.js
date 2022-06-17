exports.createOptions = (difficulty) => {
    return [
        { content: "1 - Very Easy", value: "1" },
        { content: "2 - Easy", value: "2" },
        { content: "3 - Medium (Standard 3x3)", value: "3" },
        { content: "4 - Intermediate", value: "4" },
        { content: "5 - Expert", value: "5" },
        { content: "6 - Hardcore", value: "6" }
    ].map(x => x.value == difficulty ? { ...x, selected: "selected" } : x);
};

exports.isOwner = (cubeOwner, userId) => cubeOwner == userId;