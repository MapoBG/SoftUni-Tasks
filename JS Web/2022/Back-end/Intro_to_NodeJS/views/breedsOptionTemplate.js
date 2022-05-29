module.exports = (breed) => 
`<option value=${breed.replaceAll(" ", "_")}>${breed}</option>`;