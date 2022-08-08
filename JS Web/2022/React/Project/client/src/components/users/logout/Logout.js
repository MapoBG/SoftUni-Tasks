import { useCustomNavigate } from "../../../custom-hooks/navigateHooks";
import { logoutUser } from "../../../services/authServices";


export const Logout = () => {
    const navigateTo = useCustomNavigate();

    logoutUser()
        .then(res => {
            navigateTo('/');
        })
        .catch(err => console.log(err));
}