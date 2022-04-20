require("dotenv").config()
import mysql from "mysql2/promise"
import bcrypt from "bcryptjs"
import bluebird from 'bluebird'
import db from '../models/index'

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'udemy-jwt-backend'
// })
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const hashUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    try {
        let hashPass = hashUserPassword(password)
        // connection.query(
        //     'insert into users (email,password,username) values (?,?,?)', [email, hashPass, username],
        //     function (err, result, fields) {
        //         if (err)
        //             console.log(err)
        //     }
        // )
        // const connection = await mysql.createConnection({
        //     host: DB_HOST,
        //     user: DB_USER,
        //     password: DB_PASSWORD,
        //     database: DB_DATABASE,
        //     Promise: bluebird
        // });
        // await connection.execute('insert into users (email,password,username) values (?,?,?)', [email, hashPass, username])
        await db.User.create({
            email: email,
            password: password,
            username: username
        })
    } catch (e) {
        console.log(e)
    }
}
const getUserList = async () => {
    // const connection = await mysql.createConnection({
    //     host: DB_HOST,
    //     user: DB_USER,
    //     password: DB_PASSWORD,
    //     database: DB_DATABASE,
    //     Promise: bluebird
    // });

    // const [rows, fields] = await connection.execute('SELECT * FROM users')
    // return rows
    let users = []
    users = await db.User.findAll()
    return users
}
const getUserById = async (id) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'root',
    //     database: 'udemy-jwt-backend',
    //     Promise: bluebird
    // });

    // const [rows, fields] = await connection.execute('SELECT * FROM users where id=?', [id])
    // return rows
    let user = {}
    user = await db.User.findOne({
        where: {
            id: id
        }
    })
    return user
}
const getUserByEmail = async (email) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'udemy-jwt-backend',
        Promise: bluebird
    });

    const [rows, fields] = await connection.execute('SELECT * FROM users where email=?', [email])
    return rows
}
const getUserByUserName = async (username) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'udemy-jwt-backend',
        Promise: bluebird
    });

    const [rows, fields] = await connection.execute('SELECT * FROM users where username=?', [username])
    return rows
}
const getUserByEmailAndUserName = async (email, username) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'udemy-jwt-backend',
        Promise: bluebird
    });

    const [rows, fields] = await connection.execute('SELECT * FROM users where email=? and username=?', [email, username])
    return rows
}
const deleteUser = async (id) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'root',
    //     database: 'udemy-jwt-backend',
    //     Promise: bluebird
    // });
    // await connection.execute('delete FROM users where id=?', [id])
    await db.User.destroy({
        where: {
            id: id
        }
    })
}
const updateUser = async (id, email, username) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'root',
    //     database: 'udemy-jwt-backend',
    //     Promise: bluebird
    // });
    // await connection.execute('update users set email=?, username=? where id=?', [email, username, id])
    await db.User.update(
        {
            email: email,
            username: username
        },
        {
            where: {
                id: id
            }
        })
}
module.exports = {
    createNewUser,
    getUserList,
    getUserById,
    getUserByEmail,
    getUserByUserName,
    getUserByEmailAndUserName,
    deleteUser,
    updateUser
}