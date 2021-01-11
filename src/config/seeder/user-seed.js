import bcrypt from "bcrypt";

const password = "123456";
const hashPass = bcrypt.hashSync(password, 10);


const User = {
    "model": "User",
    "documents": [
        {
            "_id": ("5ffc98c715fb3323f4edd474"),
            "username": "Huntsman",
            "email": "godspowercuche56@gmail.com",
            "password": hashPass,
            "verified": true,
            "firstName": "godspower",
            "lastName": "uche",
            "role": "admin",
            "phoneNumber": +2347035468886,
            "address": "Port Harcourt, Rivers State",
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ]
};

export default User;