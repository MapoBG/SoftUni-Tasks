import { AddNewUserBtn } from "./user/AddNewUserBtn";
import { Pagination } from "./pagination/Pagination";
import { SearchBar } from "./search-bar/SearchBar";
import { UserTable } from "./user-table/UserTable";
import { useState } from "react";


export const Main = () => {
    const [users, setUsers] = useState([]);
    return (
        <main className="main">
            <section className="card users-container">
                <SearchBar />
                <UserTable users={users} />
                <AddNewUserBtn />
                <Pagination />
            </section>
        </main >
    );
};