import { generatedToken } from "../global.js"
import { token } from "../utils/index.js"

const authMiddleware = {
    verifyJwt: async (req, res, next) => {
        try {

            // const accessToken = generatedToken[0].AT
            if (generatedToken.length === 0) throw new Error('Bạn cần đăng nhập để thực hiện hành động')
            // if (data._id !== id) throw new Error('Bạn không thể thực hiện hành động!')
            const crrUser = token.verifyTk(generatedToken[0].AT)
            req.crrUser = crrUser
            next()
        } catch (error) {
            res.status(401).send({
                message: error.message ?? 'Bạn không thể thực hiện hành động!',
                data: null
            });
        }
    }
}


export {
    authMiddleware
}