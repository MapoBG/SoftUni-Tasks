import { useState } from "react";

import { AddEditUser } from "./AddEditUser";
import { createUser, closeUserWindowHandler, openUserWindowHandler } from "../../../services/userServices";

export const AddNewUserBtn = ({ addNewUser }) => {
    const [user, setCreateUser] = useState({ 'isClicked': false });

    return (
        <>
            <button className="btn-add btn" onClick={() => openUserWindowHandler(setCreateUser, 'isClicked')}>Add new user</button>
            {user.isClicked && <AddEditUser onSave={(e) => createUser(e, setCreateUser, 'isClicked', addNewUser)} onClose={() => closeUserWindowHandler(setCreateUser, 'isClicked')} />}
        </>
    );
};