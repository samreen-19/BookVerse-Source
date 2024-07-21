const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {authenticateToken}= require("./userAuth");

//sign-up
router.post('/sign-up', async (req, res) => {
    try {
        console.log("Received signup request:", req.body);

        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username should be more than 3 letters" });
        }

        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const newUser = new User({
            username: username,
            email: email,
            password: password,
            address: address,
        });

        await newUser.save();

        console.log("User signed up successfully:", newUser);

        return res.status(200).json({ message: "Signup successful!" });

    } catch (error) {
        console.error("Error in signup route:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//sign-in
router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(400).json({ message: "Username does not exist!" });
        if (password == existingUser.password) {
            const authClaims = [{ name: existingUser.username }, { role: existingUser.role },]
            const token = jwt.sign({ authClaims }, "bookstore123", { expiresIn: "30d", });
            return res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token, });
        }
        else return res.status(400).json({ message: "Invalid credentials!" });
    } catch (error) {
        console.error("Error in signup route:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get user info
router.get('/get-user-info',authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const data= await User.findById(id);
        return res.status(200).json(data);
    }
    catch(error){
        return res.status(500).json({message: "Internal server error"});
    }
});


module.exports = router;
