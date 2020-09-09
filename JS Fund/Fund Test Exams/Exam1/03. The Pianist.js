function printSortedMusicalList(input) {
    let initialPiecesNr = Number(input[0]);
    let musicList = {};

    for (let i = 1; i <= initialPiecesNr; i++) {
        let [song, author, key] = input[i].split("|");
        if (!musicList[song]) {
            musicList[song] = {
                author,
                key,
            }
        }
    }

    let line = input.shift();

    while (line !== "Stop") {
        let [command, song, author, key] = line.split("|");
        switch (command) {
            case "Add":
                if (musicList.hasOwnProperty(song)) {
                    console.log(`${song} is already in the collection!`);
                } else {
                    musicList[song] = {
                        author,
                        key,
                    }
                    console.log(`${song} by ${author} in ${key} added to the collection!`);
                }
                break;

            case "Remove":
                if (musicList.hasOwnProperty(song)) {
                    delete musicList[song];
                    console.log(`Successfully removed ${song}!`);
                } else {
                    console.log(`Invalid operation! ${song} does not exist in the collection.`);
                }
                break;

            case "ChangeKey":
                if (musicList.hasOwnProperty(song)) {
                    musicList[song].key = author;
                    console.log(`Changed the key of ${song} to ${author}!`);
                } else {
                    console.log(`Invalid operation! ${song} does not exist in the collection.`);
                }
                break;
        }

        line = input.shift();
    }

    let sortedSongs = Object.entries(musicList)
        .sort((a, b) => a[0].localeCompare(b[0]) || musicList[a[0]].author.localeCompare(musicList[b[0]].author))

    for (let collection of sortedSongs) {
        console.log(`${collection[0]} -> Composer: ${musicList[collection[0]].author}, Key: ${musicList[collection[0]].key}`);
    }
}
printSortedMusicalList([
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'
])