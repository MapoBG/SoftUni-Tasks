//TODO...
import { useState } from "react";

import { AddEditUser } from "./AddEditUser";

export const AddNewUserBtn = () => {
    const [createUser, setCreateUser] = useState(false);

    const addCloseUserHandler = () => {
        setCreateUser(oldState => !oldState);
    };

    return (
        <>
            <button className="btn-add btn" onClick={addCloseUserHandler}>Add new user</button>
            {createUser && <AddEditUser onClose={addCloseUserHandler} />}
        </>
    );
};