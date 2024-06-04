import UserModel from "../models/users.js"
import bcrypt from 'bcrypt'
import { token } from "../utils/index.js";
import { generatedToken } from "../global.js";

const userController = {
    register: async (req, res) => {
        try {
            console.log("a");
            const data = req.body
            const salt = bcrypt.genSaltSync()
            const hash = bcrypt.hashSync(data.password, salt)
            const createdUser = await UserModel.create({
                ...data,
                password: hash,
                salt: salt
            })
            res.status(201).send({
                data: createdUser,
                message: "Tạo người dùng mới thành công",
                success: true
            })
        } catch (error) {
            res.status(403).send({
                data: null,
                message: error.message,
                success: false
            })
        }
    },
    login: async (req, res) => {
        try {
            if (generatedToken.length !== 0) throw new Error('Bạn đã đăng nhập rồi')
            const data = req.body
            const crrUser = await UserModel.findOne({
                userName: data.userName
            })
            if (!crrUser) throw new Error("Người dùng không tồn tại")
            if (bcrypt.hashSync(data.password, crrUser.salt) !== crrUser.password) throw new Error("Thông tin đăng nhập không chính xác")
            const dataUser = {
                ...crrUser.toObject()
            }
            delete dataUser.password
            delete dataUser.salt
            const tk = token.generateTk({
                userName: crrUser.userName,
                _id: crrUser._id
            });
            generatedToken.push({
                AT: tk
            })
            console.log(generatedToken);
            res.status(201).send({
                data: tk,
                message: "Đăng nhập thành công"
            })
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    },
    logout: async (req, res) => {
        generatedToken.splice(0, 1)
        console.log(generatedToken);
        res.status(201).send({
            message: 'Đăng xuất thành công'
        })
    }
}

export default userController