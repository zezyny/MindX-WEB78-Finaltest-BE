import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    salt: String
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;