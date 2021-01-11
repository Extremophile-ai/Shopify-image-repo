import bcrypt from "bcrypt";
import User from "../../services/User.js";
import jwtHelper from "../../Utility/Jwt";
import sendGrid from "../../Utility/sendgrid";


const { updateUser, findById, checkUsername, getUsers, findUser, deleteUser, createUser, verifyUser, deleteImage, addImage, findSingleImage } = User;

const { generateToken } = jwtHelper;

export default class UserController {
    static async createNewUser (req, res) {
        try {
            const { username, email, password } =req.body;
            if(!username || !email || !password) {
                return res.status(400).json({success: false, error: "one or more parameters are missing"})
            }
            const checkEmail = await findUser(email);
            const usernameExist = await checkUsername(username);
            if(usernameExist || checkEmail) {
                return res.status(409).json({ status: 409, 
                error: "sorry, email or username already taken by another user."
                });
            };
            const hash = await bcrypt.hash(password, 10);
            const userDetails = { username, email, password: hash };
            const newUser = await createUser(userDetails);
            if(newUser) {
                const token = await generateToken({ newUser });
                await sendGrid.verifyUser(email, username);
                return res.status(201).json({
                    success: true,
                    message: "you have successfuly signed up. please check your provided email address to confirm your email",
                    token
                });
            };
            return res.status(400).json({status:400, error: "user not created"});
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error"
            });
        }
    };

    static async verifyAccount (req, res) {
        try {
            const { email } = req.params;
            const verifiedAccount = await verifyUser(email);
            if(verifiedAccount) {
                res.status(200).json({ 
                    success: true, 
                    message: "email verification successful", 
                });
            }
        } catch (error) {
          return res.status(500).json({ 
              status: 500, 
              error: "Server error." 
            });
        }
    }

    static async userLogin (req, res) {
        try {
            const { email, password } = req.body;
            const user = await findUser(email);
            if(!user) return res.status(404).json({status: 404, error: "email supplied is incorrect"});
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (!verifyPassword) return res.status(404).json({status: 404, error: "password supplied is incorrect"});
            if(user.verified == false) return res.status(401).json({ status: 401, error: "please verify your account to continue!" });
            const token = await generateToken({ user });
            return res.status(200).json({ 
                success: true, 
                message: "log in successful", 
                token: token 
            });
        } catch (error) {
          return res.status(500).json({ status: 500, error: "server error." });  
        }
    };

    static async getOneUserById (req, res) {
        try {
        const { _id } = req.params;
        const getUser = await findById(_id);
        if(getUser) {
            return res.status(200).json({
                success: true,
                message: "user retrieved!",
                data: getUser
            })
        }
        return res.status(404).json({
            success: false,
            error: "user not found!"
        });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error"
            })
        }
    };

    static async getAllUsers (req, res) {
        try {
            const users = await getUsers();
            if(users) {
                return res.status(200).json({ 
                    success: true, 
                    message: "all users retrieved successfully", 
                    count: users.length,
                    data: users 
                });
            };
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error"
            });
        };
    };

    static async updateUser (req, res) {
        try {
            const { _id } = req.decoded.user;
            const { phoneNumber, lastName, firstName } = req.body;
            const updateDetails = { phoneNumber, lastName, firstName }
            const updateUserDetails = await updateUser(_id, updateDetails);
            if(updateUserDetails) {
                return res.status(200).json({
                    success: true,
                    message: "user details updated",
                    data: updateUserDetails
                });
            }
            return res.status(404).json({
                success: false,
                error: "User Not Found!"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error"
            });
        };
    };

    static async deleteUser (req, res) {
        try {
            const { _id } = req.decoded.user;
            const removeUser = await deleteUser(_id);
            if(removeUser) {
                return res.status(200).json({
                    success: true,
                    message: "user account deleted"
                });
            };
            return res.status(404).json({
                success: false,
                error: "User Not Found!"
            }); 
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error"
            });
        };
    };

    static async addImage (req, res) {
        try {
            const { _id } = req.decoded.user;
            const { title, image } = req.body; 
            const imageDetails = { title, image }
            const uploadIage =await addImage(_id, imageDetails);
            if (uploadIage) {
                return res.status(200).json({ success: true,
                message: "image added successfuly"
                });
            }
            return res.status(404).json({status: 404, error: "user not found"})
        } catch (error) {
           return res.status(500).json({ status: 500, error: "server error." });   
        }
    };

    static async getOneImage (req, res) {
        try {
            const { _id } = req.decoded.user;
            const { title } = req.params
            const getImage = await findSingleImage(_id, title);
            if(getImage.images.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: "image not found!"
                });
            }
            return res.status(200).json({
                success: true,
                message: "image retrieved!",
                data: getImage
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "server error"
            })
        }
    };

    static async deleteImage (req, res) {
        try {
            const { _id } = req.decoded.user;
            const { title } = req.params;
            const removeImage = await deleteImage(_id, title);
            if(removeImage) {
                return res.status(200).json({
                    success: true,
                    message: "image deleted"
                });
            };
            return res.status(404).json({
                success: false,
                error: "image not found!"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "server error"
            });
        };
    }
};