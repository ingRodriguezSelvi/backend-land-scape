import { getAccessByUser } from "./access.controller";
import { login } from "./auth.controller";
import {assignPermissionToUser, getPermissionByUserId, removePermissionFromUser } from "./permission.controller";
import {createUser, deleteUser, getUsers, updateUser } from "./user.controller";

export {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getPermissionByUserId,
    assignPermissionToUser,
    removePermissionFromUser,
    getAccessByUser,
    login
}
