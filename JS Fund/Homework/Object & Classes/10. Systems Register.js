function sortSystemRegisters(input) {
    let register = {};

    input.forEach(line => {
        let [system, component, subcomponent] = line.split(" | ");
        if (!register[system]) {
            register[system] = {};
        }
        if (!register[system][component]) {
            register[system][component] = [];
        }
        register[system][component].push(subcomponent);
    })

    let sortedSystems = Object.keys(register)
        .sort((a, b) => Object.keys(register[b]).length - Object.keys(register[a]).length || a.localeCompare(b));

    sortedSystems.forEach((sys) => {
        console.log(sys);
        let sortedComponents = Object.keys(register[sys]).sort((a, b) => Object.keys(register[sys][b]).length - Object.keys(register[sys][a]).length);
        sortedComponents.forEach((comp) => {
            console.log(`|||${comp}`);
            register[sys][comp].forEach((subComponent2) => {
                console.log(`||||||${subComponent2}`);
            });
        });
    });
}
sortSystemRegisters([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
])