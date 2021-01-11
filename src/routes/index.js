import { Router } from "express";
import UserController from "../controller/User/user";import Authentication from "../middleware/auth";

const router = Router();

const { createNewUser, addImage, updateUser, getAllUsers, deleteUser, verifyAccount, userLogin, getOneUserById, deleteImage, getOneImage } = UserController;

const { authenticateUser } = Authentication;

router.get("/users", getAllUsers);
router.get("/user/:_id", getOneUserById);
router.get("/user/image/:title", authenticateUser, getOneImage);
router.get("/user/signup/verify-user/:email", verifyAccount);
router.post("/user/login", userLogin);
router.post("/user/signup", createNewUser);
router.patch("/user/profile/update", authenticateUser, updateUser);
router.patch("/user/image/upload", authenticateUser, addImage);
router.delete("/user/image/:title/delete", authenticateUser, deleteImage);
router.delete("/user/delete", authenticateUser, deleteUser);

export default router;
