import User from "../models/user.model";

export default createUser = async(req, res) => {
        const user = user.body;
        if(!user.email || !user.username || !user.password) {
            return res.status(400).json({success: false, message: "Please provide all fields"});
        }

        const newUser = new User(user);

        try {
            await newUser.save();
            res.status(201).json({success: true, data: newUser});
        }
        catch(error) {
            console.error("Error in Create User: ", error.message);
            res.status(500).json({success: false, message: "Server Error"});
        }
    }
