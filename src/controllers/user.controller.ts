import {Response,Request} from "express";
import {User} from "../models/user.model";
import bcrypt from "bcryptjs";

export const getUsers = async (req: Request, res: Response) => {
    const {limit = '5', from = '0'} = req.query;
    const query = {deleted: false};
    try{
        const [total, users] = await Promise.all([
            User.countDocuments(),
            User.find( query )
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        return res.status(200).json({
            ok: true,
            errors: {},
            data: {
                total,
                users
            }
        })
    }catch (exception) {
        return res.status(500).json({
            ok: false,
            errors: {
                msg: `Error getting users ${exception}`,
            },
            data:{}
        })
    }
}
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User({...req.body})
        //Hash password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        //Save user
        await user.save();
        //Generate response
        return res.status(201).json({
            ok: true,
            errors: {},
            data: {
                uid: user._id,
            }
        })
    }
    catch(exception) {
        return res.status(500).json({
            ok: false,
            errors: {
                msg: `Error creating user ${exception}`,
            },
            data:{}
        })
    }
}
export const updateUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {password,deleted, ...rest} = req.body;
    try {
        if ( deleted ) {
            return res.status(400).json({
                status: false,
                errors: {
                    msg: 'Esta operación no es permitida - deleted'
                },
                data:{}
            });
        }

        if ( password ){
            const salt = bcrypt.genSaltSync();
            rest.password = bcrypt.hashSync(password, salt);
        }
        await User.findByIdAndUpdate(id, rest);
        res.status(201).json({
            ok: true,
            errors: {},
            data: {
                msg: 'User updated'
            }
        })
    }
    catch(exception) {
        return res.status(500).json({
            ok: false,
            errors: {
                msg: `Error updating user ${exception}`,
            },
            data:{}
        })
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, {deleted: true});
        res.status(201).json({
            ok: true,
            errors: {},
            data: {
                user
            }
        })
    }
    catch(exception) {
        return res.status(500).json({
            ok: false,
            errors: {
                msg: `Error deleting user ${exception}`,
            },
            data:{}
        })
    }
}

