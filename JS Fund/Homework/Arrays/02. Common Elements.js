function findMatches(params1, params2){
    for (const element of params1) {
        for (const el of params2) {
            if(element === el){
                console.log(el);
            }
        }
    }
}
findMatches(['Hey', 'hello', 2, 4, 'Peter', 'e'],
['Petar', 10, 'hey', 4, 'hello', '2']
)