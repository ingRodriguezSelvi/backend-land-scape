import {Router} from "express";
import {assignPermissionToUser, getPermissionByUserId, removePermissionFromUser} from "../controllers";


const routerPermission = Router();

routerPermission.get('/:userId', getPermissionByUserId);
routerPermission.post('/:userId', assignPermissionToUser);
routerPermission.delete('/:userId', removePermissionFromUser);
export default routerPermission;
