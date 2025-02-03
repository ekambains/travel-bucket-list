import User from "../models/user.model";

export const signup = async(req, res) => {
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
};

export const login = async(req, res) => {
    try {
        const user = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.username }]
        });

        if(!user) {
            return res.status(404).json({success: false, message: "User doesn't exist."});
        }

        if(!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({success: false, message: "Incorrect Password"});
        }

        const payload = {id: user._id, username: user.username, email: user.email};
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({success: true, message: "Login Successful", accessToken: accessToken});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "An error occured during login."})
    }
}
