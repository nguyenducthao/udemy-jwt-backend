import mysql from "mysql2"
import bcrypt from "bcryptjs"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'udemy-jwt-backend'
})

const hashUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password)
    connection.query(
        'insert into users (email,password,username) values (?,?,?)', [email, hashPass, username],
        function (err, result, fields) {
            if (err)
                console.log(err)
        }
    )
}
const getUserList = () => {
    let users = []
    connection.query(
        'select * from users',
        function (err, result, fields) {
            if (err)
                console.log(err)
        }
    )
}
module.exports = {
    createNewUser,
    getUserList
}