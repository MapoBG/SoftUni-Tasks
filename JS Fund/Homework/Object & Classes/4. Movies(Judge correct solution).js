function moviesInfo(input) {

    let movies = [];

    for (let element in input) {
        let arr = input[element].split(" ");
        if (arr.includes("addMovie")) {
            let film = arr.splice(1).join(" ");
            movies.push({ name: film });
        } else if (arr.includes("directedBy")) {
            let index = arr.indexOf("directedBy");
            let film = arr.slice(0, index).join(" ");
            let movieData = movies.find(e => e.name === film);
            if (movieData) {
                let director = arr.slice(index + 1).join(" ");
                movieData.director = director;
            }
        } else if (arr.includes("onDate")) {
            let index = arr.indexOf("onDate");
            let film = arr.slice(0, index).join(" ");
            let movieData = movies.find(e => e.name === film);
            if (movieData) {
                let date = arr.slice(index + 1).join(" ");
                movieData.date = date;
            }
        }
    }
    movies.forEach(m => {
        if (m.hasOwnProperty("name") && m.hasOwnProperty("date") && m.hasOwnProperty("director")) {
            console.log(JSON.stringify(m));
        }
    })
}
moviesInfo([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
]
);