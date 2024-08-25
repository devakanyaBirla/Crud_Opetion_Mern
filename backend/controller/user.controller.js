import userModel from "../models/user.model.js";


const CreateUser = async (req, res) => {
    try {
        // console.log(req.body);

        const { name, fathername, email, phone } = req.body;
        let result = await userModel.create({
            name, fathername, email, phone

        })
        console.log(result);

        return res.status(200).json({ mess: "user added ", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, mess: "Internal Server Error" });
    }
}


const getUser = async (req, res) => {
    try {
        const userList = await userModel.find();
        if (!userList) {
            return res.status(404).json({ mess: "User Not Found" });
        }
        res.status(200).json({ data: userList })
    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal Server Error" })

    }
}


const updateUser = async (req, res) => {
    try {
        console.log("id", req.params.id);
        const { _id, ...updateData } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            updateData,
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        return res.status(200).json({ message: "User updated successfully.", data: updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deletUser = ((request, response, next) => {
    console.log(request.params._id);

    userModel.findByIdAndDelete(request.params._id)
        .then(() => {
            return response.status(200).json({ message: "User delete Successfully" });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error" });
        });
});

export { CreateUser, getUser, updateUser };