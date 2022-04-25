import db from '../models/index'
import bcrypt from "bcryptjs"

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
const checkUsernameExist = async (username) => {
    let user = {}
    user = await db.User.findOne({
        where: {
            username: username
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
        let isUsernameExist = await checkPhoneExist(rawUserData.username)
        if (isUsernameExist) {
            return {
                EM: 'The username is already exist',
                EC: 1
            }
        }
        let hashPassword = hashUserPassword(rawUserData.password)
        await db.User.create({
            email: rawUserData.email,
            password: hashPassword,
            username: rawUserData.username,
            phone: rawUserData.phone
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
module.exports = {
    registerNewUser
}