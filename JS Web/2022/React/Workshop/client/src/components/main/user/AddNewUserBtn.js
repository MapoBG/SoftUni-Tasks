import { useState } from "react";

import { AddEditUser } from "./AddEditUser";
import { createUser, closeUserWindowHandler, openUserWindowHandler } from "../../../services/userServices";

export const AddNewUserBtn = () => {
    const [user, setCreateUser] = useState({ 'isClicked': false });

    return (
        <>
            <button className="btn-add btn" onClick={() => openUserWindowHandler(setCreateUser, 'isClicked')}>Add new user</button>
            {user.isClicked && <AddEditUser onSave={(e) => createUser(e, setCreateUser, 'isClicked')} onClose={() => closeUserWindowHandler(setCreateUser, 'isClicked')} />}
        </>
    );
};