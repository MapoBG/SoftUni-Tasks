import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../../services/authServices";


export const Logout = () => {
    const navigateTo = useNavigate();

    logoutUser()
        .then(res => {
            navigateTo('/');
        })
        .catch(err => console.log(err));
}