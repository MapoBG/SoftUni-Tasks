import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return navigateTo;
};