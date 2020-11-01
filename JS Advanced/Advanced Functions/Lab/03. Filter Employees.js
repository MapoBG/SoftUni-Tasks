function printInfo(data, criteria) {
    let inputData = JSON.parse(data);
    let count = 0;

    if (criteria == "all") {
        inputData.forEach(pInfo => {
            console.log(`${count}. ${pInfo.first_name} ${pInfo.last_name} - ${pInfo.email}`);
            count++;
        });
    } else {
        inputData
            .filter(info => filterByCriteria(info, criteria))
            .forEach(pInfo => {
                console.log(`${count}. ${pInfo.first_name} ${pInfo.last_name} - ${pInfo.email}`);
                count++;
            });
    }

    function filterByCriteria(obj, criteria) {
        let [keyCriteria, criteriaValue] = criteria.split("-");
        return (obj[keyCriteria] == criteriaValue);

    }
}
printInfo(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
},  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
    'gender-Female'

)

//