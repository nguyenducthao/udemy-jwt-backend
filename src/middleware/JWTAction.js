require('dotenv').config()
import jwt from "jsonwebtoken";

const createJWT = () => {
    let payload = { name: 'nguyễn đức thảo', email: 'ndthaodng@gmail.com' }
    let key = process.env.JWT_SECRET
    let token = null
    try {
        token = jwt.sign(payload, key)
    } catch (err) {
        console.log(err)
    }
    console.log('token: ', token)
    return token
}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let data = null
    try {
        let decoded = jwt.verify(token, key)
        data = decoded
    } catch (err) {
        console.log(err)
    }
    return data
}
module.exports = {
    createJWT,
    verifyToken
}