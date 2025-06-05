import mongoose from "mongoose";

const connectionDb = async (): Promise<void>  => {
    try {
        const connect  = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectionDb;