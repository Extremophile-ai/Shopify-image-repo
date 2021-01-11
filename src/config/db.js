import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const connectDB = async () => {
    try {
        let connect;
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }
        switch(process.env.NODE_ENV) {
            case "development":
                connect = await mongoose.connect(process.env.DEV_MONGO_URI, options);
                break;
            case "test":
                connect = await mongoose.connect(process.env.TEST_MONGO_URI, options);
                break;
            default:
               console.log("Connection did not succeed");
            }; 
        console.log(`connected to MongoDB in ${process.env.NODE_ENV} mode on ${connect.connection.host}`);
    } catch (error) {
      return error;
    };
};


const dropDB = async () => {
    try {
        for(let collection in mongoose.connection.collections) {
            mongoose.connection.collections[collection].drop(() => {})
        }
    } catch (error) {
        throw error
    }
}

export {connectDB, dropDB};
