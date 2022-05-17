require('dotenv').config()
import db from '../models/index'
import bcrypt from "bcryptjs"
import { Op } from 'sequelize'
import { getGroupWithRoles } from './JWTService'
import { createJWT } from '../middleware/JWTAction'

const hashUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}
const checkEmailExist = async (email) => {
    let user = {}
    user = await db.User.findOne({
        where: {
            email: email
        }
    })
    if (user) {
        return true
    }
    else {
        return false
    }
}
const checkPhoneExist = async (phone) => {
    let user = {}
    user = await db.User.findOne({
        where: {
            phone: phone
        }
    })
    if (user) {
        return true
    }
    else {
        return false
    }
}
const registerNewUser = async (rawUserData) => {
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email)
        if (isEmailExist) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist) {
            return {
                EM: 'The phone is already exist',
                EC: 1
            }
        }
        let hashPassword = hashUserPassword(rawUserData.password)
        await db.User.create({
            email: rawUserData.email,
            password: hashPassword,
            username: rawUserData.username,
            phone: rawUserData.phone,
            groupId: 4
        })
        return {
            EM: 'A user is created successfully',
            EC: 0
        }
    }
    catch (e) {
        console.log(e)
        return {
            EM: 'Something wrongs in service...',
            EC: -2
        }
    }
}
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}
const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword) {
                let groupWithRoles = await getGroupWithRoles(user)
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload)
                return {
                    EM: 'ok!',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }
        return {
            EM: 'Your email/phone number or password is incorrect!',
            EC: 1,
            DT: ''
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrong in service',
            EC: ''
        }
    }
}
module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmailExist,
    checkPhoneExist
}