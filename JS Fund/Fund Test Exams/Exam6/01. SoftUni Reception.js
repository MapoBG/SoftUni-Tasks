function calcTime(input) {
    input = input.map(Number);
    let totalEfficiencyPerHour = input[0] + input[1] + input[2];
    let totalStudents = input[3];
    let afterBreak = totalStudents - totalEfficiencyPerHour * 3;
    let result = 0;

    if (afterBreak <= 0) {
        result = Math.ceil(totalStudents / totalEfficiencyPerHour);
    } else {
        result++;
        while (afterBreak - totalEfficiencyPerHour * 3 > 0) {
            result++;
            afterBreak -= totalEfficiencyPerHour * 3 ;
        }
        result += Math.ceil(totalStudents / totalEfficiencyPerHour);
    }

    console.log(`Time needed: ${result}h.`);

}
calcTime(['1','2','3','45'])