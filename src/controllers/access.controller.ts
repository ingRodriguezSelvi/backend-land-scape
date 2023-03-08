import {Access} from "../models/access.model";
import {Request, Response} from "express";

export const getAccessByUser = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        const access = await Access.find({user: userId});
        res.status(200).json({
            ok: true,
            errors: {},
            data: {
                access
            }
        });
    }catch (exception) {
        res.status(500).json({
            ok: false,
            errors: {
                msg: `Error getting access ${exception}`,
            },
            data:{}
        })
    }
}
