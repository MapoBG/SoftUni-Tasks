import { useState } from "react";

import { AddEditUser } from "./AddEditUser";
import { createUser, closeUserWindowHandler, openUserWindowHandler } from "../../../services/userServices";

export const AddNewUserBtn = () => {
    const [user, setCreateUser] = useState(false);

    return (
        <>
            <button className="btn-add btn" onClick={() => openUserWindowHandler(setCreateUser)}>Add new user</button>
            {user && <AddEditUser onSave={(e) => createUser(e, setCreateUser)} onClose={() => closeUserWindowHandler(setCreateUser)} />}
        </>
    );
};