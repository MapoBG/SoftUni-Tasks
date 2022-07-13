import { useState } from "react";

import { AddEditUser } from "./AddEditUser";
import { createUser, closeUserWindowHandler, openUserWindowHandler } from "../../../services/userServices";

export const AddNewUserBtn = ({ addNewUser }) => {
    const [button, showHideCreateUser] = useState({ 'isClicked': false });

    return (
        <>
            <button className="btn-add btn" onClick={() => openUserWindowHandler(showHideCreateUser, 'isClicked')}>Add new user</button>
            {button.isClicked && 
            <AddEditUser onSave={(e) => createUser(e, showHideCreateUser, 'isClicked', addNewUser)} onClose={() => closeUserWindowHandler(showHideCreateUser, 'isClicked')} />}
        </>
    );
};