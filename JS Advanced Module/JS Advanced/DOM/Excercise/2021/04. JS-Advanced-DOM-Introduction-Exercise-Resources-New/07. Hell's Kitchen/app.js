function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick() {
      const restourantsData = {};

      let inputText = document
         .querySelector("#inputs textarea").value
         .split("\"")
         .filter((e, i) => i % 2 != 0);

      inputText.forEach(line => {
         let [restourant, workers] = line.split(" - ");
         workers = workers.split(", ");
         workers.forEach(workerInfo => {
            let [name, salary] = workerInfo.split(" ");
            salary = Number(salary);

            if (!restourantsData[restourant]) {
               restourantsData[restourant] = {};
            }

            restourantsData[restourant][name] = salary;
         });
      });

      let avgSalary = 0;
      let bestRestourant = "";
      let bestSalary = 0;

      Object.keys(restourantsData).forEach(restourant => {
         let currentBestAvgSalary = 0;

         const salaries = Object.values(restourantsData[restourant]);
         salaries.forEach(salary => {
            currentBestAvgSalary += salary;
         });

         currentBestAvgSalary /= salaries.length;

         if (currentBestAvgSalary > avgSalary) {
            avgSalary = currentBestAvgSalary;
            bestRestourant = restourant;
            bestSalary = Math.max(...salaries);
         }
      });

      const employees = [];

      Object
         .keys(restourantsData[bestRestourant])
         .sort((e1, e2) => restourantsData[bestRestourant][e2] - restourantsData[bestRestourant][e1])
         .forEach(e => employees.push(`Name: ${e} With Salary: ${restourantsData[bestRestourant][e]}`));

      document.querySelector("#bestRestaurant p").textContent = `Name: ${bestRestourant} Average Salary: ${avgSalary.toFixed(2)} Best Salary: ${bestSalary.toFixed(2)}`;
      document.querySelector("#workers p").textContent = employees.join(" ");
   }
}