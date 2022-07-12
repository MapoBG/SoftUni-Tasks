import { useState } from "react";

import { closeUserWindowHandler, editUser, getUserById } from "../../../services/userServices";
import { AddEditUser } from "../user/AddEditUser";
import { UserDetails } from "../user/UserDetails";
import { Overlaps } from "./overlaps/Overlaps";
import { TableRow } from "./table-row/TableRow";

export const UserTable = ({ users }) => {
    const [userAction, setUserAction] = useState({ 'Edit': false, 'Details': false, 'Delete': false });
    // const [userEdit, setEditUser] = useState(false);
    // const [userDetails, setUserDetails] = useState(false);

    const actionClickHandler = (userId, actionType) => {
        getUserById(userId)
            .then(res => setUserAction(oldState => ({ ...oldState, [actionType]: res })))
    }

    // const detailsClickHandler = (userId) => {
    //     getUserById(userId)
    //         .then(res => setUserDetails(oldState => res))
    // };

    // const editClickHandler = (userId) => {
    //     getUserById(userId)
    //         .then(res => setEditUser(oldState => res))
    // }

    return (
        <div className="table-wrapper">
            {/* <!-- Overlap components  --> */}
            {<Overlaps users={users} /> && users.length}

            {userAction.Details && <UserDetails user={userAction.Details} onClose={() => closeUserWindowHandler(setUserAction, 'Details')} />}
            {userAction.Edit && <AddEditUser user={userAction.Edit} onSave={(e) => editUser(e, userAction.Edit._id, setUserAction, 'Edit')} onClose={() => closeUserWindowHandler(setUserAction, 'Edit')} />}

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Image
                        </th>
                        <th>
                            First name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Created
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => <TableRow key={u._id} user={u} onActionClick={actionClickHandler} />)}
                </tbody>
            </table>
        </div>
    );
};