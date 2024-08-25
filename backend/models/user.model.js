import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    fathername: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;