import {Request, Response} from 'express';
import {User} from "../models/user.model";
import {generateJWT} from "../helpers/jwt.helper";
import bcryptjs from "bcryptjs";
import {Access} from "../models/access.model";
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                status: false,
                errors: {
                    msg: 'Email or password incorrect'
                },
                data:{}
            });
        }
        if (user.deleted) {
            return res.status(400).json({
                status: false,
                errors: {
                    msg: 'User deleted'
                },
                data:{}
            });
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                status: false,
                errors: {
                    msg: 'Email or password incorrect'
                },
                data:{}
            });
        }
        const token = await generateJWT(user.id, user.email, user.fullName);
        //Create register in access history
        const access = new Access({
            user: user.id,
        });
        await access.save();
        res.json({
            status: true,
            errors: {},
            data: {
                token
            }
        });
    } catch (exception) {
        res.status(500).json({
            status: false,
            errors: {
                msg: 'Unexpected error: ' + exception
            },
            data:{}
        });
    }
}
