import {Router} from "express";
import { getAccessByUser } from "../controllers";

const routerAccess = Router();

routerAccess.get('/:userId', getAccessByUser);

export default routerAccess;
