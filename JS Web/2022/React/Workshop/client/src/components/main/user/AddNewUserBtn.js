//TODO...
import { useState } from "react";

import { closeUserWindowHandler, openUserWindowHandler } from "../../../services/utils";
import { AddEditUser } from "./AddEditUser";


export const AddNewUserBtn = () => {
    const [createUser, setCreateUser] = useState(false);

    return (
        <>
            <button className="btn-add btn" onClick={() => openUserWindowHandler(setCreateUser)}>Add new user</button>
            {createUser && <AddEditUser onClose={() => closeUserWindowHandler(setCreateUser)} />}
        </>
    );
};