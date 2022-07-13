import { useEffect, useState } from "react";

import { AddNewUserBtn } from "./user/AddNewUserBtn";
import { Pagination } from "./pagination/Pagination";
import { SearchBar } from "./search-bar/SearchBar";
import { UserTable } from "./user-table/UserTable";
import { getAll } from "../../services/userServices";


export const Main = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getAll()
            .then((result) => {
                setUsers(oldUsers => result.users);
            })
            .catch((err) => err);
    }, []);

    const addedUserHandler = (newUser) => {
        setUsers(oldUsers => ([...oldUsers, newUser]));
    };

    return (
        <main className="main">
            <section className="card users-container">
                <SearchBar />
                <UserTable users={users} />
                <AddNewUserBtn addNewUser={addedUserHandler} />
                <Pagination />
            </section>
        </main >
    );
};