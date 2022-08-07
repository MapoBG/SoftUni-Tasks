import { useContext } from "react"
import { AuthContext } from "../../../contexts/authContext"
import { logoutUser } from "../../../services/authServices";


export const Logout = () => {
    const { navigateToHome } = useContext(AuthContext);

    logoutUser()
        .then(res => {
            navigateToHome();
        })
        .catch(err => console.log(err));
}