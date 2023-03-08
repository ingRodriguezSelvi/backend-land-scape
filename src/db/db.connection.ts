import mongoose, { ConnectOptions } from "mongoose";



export const dbConnection = async () => {
    const connectionString = process.env.BD_MONGO_URL;
    await  mongoose
        .connect(connectionString!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        } as ConnectOptions)
        .then((_db) => {
            console.log("Database Connected Success" );
        })
        .catch((err) => {
            console.log("Error Connecting to the Database: ", err);
        });
}
