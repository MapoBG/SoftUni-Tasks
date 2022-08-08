import { useContext } from "react"

import { AuthContext } from "../contexts/authContext";


export const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    return authContext;
};