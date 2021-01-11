import User from "../model/User";

export default class UserServices {
    static async createUser (userDetails) {
        try {
            return await User.create(userDetails);
        } catch (error) {
          return error;
        };
    };

    static async findUser (email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
          return error;
        };
    };

    static async findById(_id) {
        try {
            return await User.findOne({ _id })
        } catch (error) {
            return error;
        }
    };

    static async findSingleImage (_id, title) {
         try {
            return await User.findOne({ _id }).select(
                {
                    images: { 
                        $elemMatch: { title } 
                    }
                }
            );   
         } catch (error) {
            return error;  
         }
    };

    static async getUsers () {
        try {
            return await User.find();
        } catch (error) {
          return error;
        };
    };

    static async checkUsername (username) {
        try {
            return await User.findOne({ username });
        } catch (error) {
          return error;
        };
    };

    static async updateUser(_id, updateDetails) {
        try {
            return await User.findByIdAndUpdate( _id, updateDetails, { new: true })
        } catch (error) {
            return error;
        };
    };

    static async verifyUser (email) {
        try {
            return await User.findOneAndUpdate({ email }, { $set: {verified: true}}, {new: true} );
        } catch (error) {
          return error;
        }
    }

    static async deleteUser(_id) {
        try {
            return await User.findByIdAndDelete({ _id });
        } catch (error) {
          return error;
        };
    };

    static async addImage (_id, imageDetails) {
        try {
            return await User.updateOne(
                { _id },
                {
                    $addToSet: {
                        images: [
                            imageDetails
                        ]
                    }
                },
                {
                    new: true 
                }
            );            
        } catch (error) {
            return error;
        }
    };

    static async deleteImage(_id, title) {
        try {
            return await User.updateOne({_id}, 
                {
                    $pull: {
                        images: { 
                            title
                        }
                    }
                } 
            );
        } catch (error) {
          return error;
        }
    };

    // static async addBulkImages()
    // static async deleteBulkImages()
};

