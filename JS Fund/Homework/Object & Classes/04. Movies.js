function printMovies(input) {
    let movieList = {};

    input.forEach(line => {
        line = line.split(" ");
        if (line.includes("addMovie")) {
            let movieName = line.slice(1).join(" ");
            movieList[movieName] = {};
        } else if (line.includes("directedBy")) {
            let index = line.indexOf("directedBy");
            let movieName = line.slice(0, index).join(" ");
            let director = line.slice(index + 1);
            if (movieList[movieName]) {
                movieList[movieName].director = director.join(" ");
            }
        } else if (line.includes("onDate")) {
            let index = line.indexOf("onDate");
            let movieName = line.slice(0, index).join(" ");
            let date = line.slice(index + 1);
            if (movieList[movieName]) {
                movieList[movieName].date = date[0];
            }
        }
    });

    let result = [];
    for (const film in movieList) {
        if (movieList[film].director && movieList[film].date){
            result.push({name: film, date: movieList[film].date, director: movieList[film].director});
        }
    }
    result.forEach(f => console.log(JSON.stringify(f)));
}
printMovies([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
]
)