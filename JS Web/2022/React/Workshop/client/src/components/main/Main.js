import { AddNewUser } from "../add-new-user/AddNewUser";
import { Pagination } from "../pagination/Pagination";
import { SearchBar } from "../search-bar/SearchBar";


export const Main = () => {
    return (
        <main className="main">
            <section className="card users-container">
                <SearchBar />

                <AddNewUser />
                <Pagination />
            </section>
        </main >
    );
};