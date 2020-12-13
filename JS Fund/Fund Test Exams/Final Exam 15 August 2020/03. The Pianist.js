function solve(input) {
    let songsNumber = input.shift();
    let initialSongs = input.slice(0, songsNumber);
    let songCommands = input.slice(songsNumber);
    let songs = {};
    let actions = {
        Add(songsObj, song, composer, key) {
            if (songsObj[song]) {
                console.log(`${song} is already in the collection!`);
                return;
            }
            songsObj[song] = { composer, key };

            console.log(`${song} by ${composer} in ${key} added to the collection!`);
        },
        Remove(songsObj, song) {
            if(!songsObj[song]){
                console.log(`Invalid operation! ${song} does not exist in the collection.`);
                return;
            }
            delete songsObj[song];
            console.log(`Successfully removed ${song}!`);
        },
        ChangeKey(songsObj, song, newKey){
            if(!songsObj[song]){
                console.log(`Invalid operation! ${song} does not exist in the collection.`);
                return;
            }
            songsObj[song].key = newKey;
            console.log(`Changed the key of ${song} to ${newKey}!`);
        },
    };

    initialSongs.forEach(songInfo => {
        let [song, composer, key] = songInfo.split("|");

        if (!songs[song]) {
            songs[song] = {};
        }

        songs[song].composer = composer;
        songs[song].key = key;
    });

    let currentLine = songCommands.shift();

    while (currentLine != "Stop") {
        let [command, song, arg1, arg2] = currentLine.split("|");

        actions[command](songs, song, arg1, arg2);

        currentLine = songCommands.shift();
    };

    Object.keys(songs)
    .sort((song1, song2) => song1.localeCompare(song2))
    .forEach(song => {
        console.log(`${song} -> Composer: ${songs[song].composer}, Key: ${songs[song].key}`);
    });
}



solve([
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
]);

console.log("-----");

solve([
    '4',
    'Eine kleine Nachtmusik|Mozart|G Major',
    'La Campanella|Liszt|G# Minor',
    'The Marriage of Figaro|Mozart|G Major',
    'Hungarian Dance No.5|Brahms|G Minor',
    'Add|Spring|Vivaldi|E Major',
    'Remove|The Marriage of Figaro',
    'Remove|Turkish March',
    'ChangeKey|Spring|C Major',
    'Add|Nocturne|Chopin|C# Minor',
    'Stop'
]);