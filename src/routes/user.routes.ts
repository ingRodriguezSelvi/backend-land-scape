import {Router} from "express";
import {check} from "express-validator";

import {createUser, deleteUser, getUsers, updateUser} from "../controllers";
import {hasPermission, userExistById, validateInputs, validateJWT} from "../middlewares";


const routerUser = Router();

routerUser.get('/', getUsers);

/*
    Route: /api/user/
    method: POST
    params: name,email, password
    description: Create user
 */
routerUser.post('/', [
    check('fullName', 'Full name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
    validateInputs
], createUser);

/*
    Route: /api/user/:id
    method: PUT
    params: id
    description: Update user
 */
routerUser.put('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userExistById),
    validateInputs,
], updateUser);
/*
    Route: /api/user/:id
    method: DELETE
    params: id
    description: Delete user
 */
routerUser.delete('/:id', [
    validateJWT,
    hasPermission('FULL_ACCESS', 'READ_WRITE'),
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userExistById),
    validateInputs
], deleteUser);

export default routerUser;
