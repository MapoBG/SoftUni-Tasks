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
            .catch(err => setUsers(err));
    }, []);

    const addedUserHandler = (newUser) => {
        setUsers(oldUsers => ([...oldUsers, newUser]));
    };

    const updatedUserHandler = (updatedUser) => {
        updatedUser
            .then(newUser => {
                setUsers(oldUsers => {
                    const newUsers = oldUsers.map(user => user._id === newUser._id ? newUser : user)

                    return newUsers;
                });
            })
            .catch(err => setUsers(err));
    };

    const deletedUserHandler = (deletedUser) => {
        deletedUser
            .then(user => {
                setUsers(oldUsers => {
                    const index = oldUsers.findIndex(u => u._id === user.userId);
                    oldUsers.splice(index, 1);

                    return oldUsers;
                });
            })
            .catch(err => setUsers(err));
    };

    return (
        <main className="main">
            <section className="card users-container">
                <SearchBar />
                <UserTable users={users} updateUser={updatedUserHandler} deleteUserUpdate={deletedUserHandler} />
                <AddNewUserBtn addNewUser={addedUserHandler} />
                <Pagination />
            </section>
        </main >
    );
};