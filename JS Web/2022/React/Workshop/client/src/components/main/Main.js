import { AddNewUser } from "./add-new-user/AddNewUser";
import { Pagination } from "./pagination/Pagination";
import { SearchBar } from "./search-bar/SearchBar";
import { UserTable } from "./user-table/UserTable";


export const Main = () => {
    return (
        <main className="main">
            <section className="card users-container">
                <SearchBar />
                <UserTable />
                <AddNewUser />
                <Pagination />
            </section>
        </main >
    );
};