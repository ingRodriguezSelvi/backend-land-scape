import {Router} from "express";
import {login} from "../controllers";
import {check} from "express-validator";
import {validateInputs} from "../middlewares";

const routerAuth = Router();

routerAuth.post('/login',
    [
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email no valid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password is incorrect' +
            '').isLength({min: 6}),
        validateInputs
    ],
    login);

export default routerAuth;
