//for uncontrolled forms
// export const getFormData = (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const { firstName, lastName, email, phoneNumber, imageUrl, ...address } = Object.fromEntries(formData);
//     const userData = { firstName, lastName, email, phoneNumber, imageUrl, address };

//     return userData;
// };