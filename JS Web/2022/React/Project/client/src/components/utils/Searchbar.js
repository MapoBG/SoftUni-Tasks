import { useEffect, useState } from 'react';
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { RiSearchLine } from 'react-icons/ri';
import Button from './Button';

export const SearchBar = ({ changePage }) => {
    const [inputValue, setInputValue] = useState('');
    const [searchParams] = useSearchParams();

    const path = useLocation.pathname;
    const navigate = useNavigate();

    const formControls = useAnimation();
    const setFormMaxWidth = (width) => {
        formControls.start({ maxWidth: width });
    };

    const search = (e) => {
        e.preventDefault();

        if (changePage) changePage();
        
        const searchParams = createSearchParams({ search: inputValue });
        navigate({
            pathname: path,
            search: searchParams.toString(),
        });
    };

    useEffect(() => setInputValue(searchParams.get('search') || ''), [searchParams]);

    return (
        <motion.form
            className="SearchBar"
            initial={{ maxWidth: 400 }}
            animate={formControls}
            onSubmit={search}
        >
            <input
                type="text"
                placeholder="Search games..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setFormMaxWidth(700)}
                onBlur={() => setFormMaxWidth(400)}
            />
            <Button type="submit" title="Search">
                <RiSearchLine />
            </Button>
        </motion.form>
    );
};