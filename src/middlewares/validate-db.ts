import {User} from "../models/user.model";

export const userExistById = async(id:string) => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`The user with id ${id} does not exist`);
    }
}
