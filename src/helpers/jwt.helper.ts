import jwt from 'jsonwebtoken';

export const generateJWT = (uid:string, email:string, fullName:string ) =>{
    const payload = { uid,email,name: fullName };
    return new Promise((resolve, reject) => {
        jwt.sign( payload, process.env.SECRET_JWT_SEED!, { expiresIn: '24h' }, (err, token) =>{
            if(err) reject(err);
            return resolve(token);
        });
    });

}
