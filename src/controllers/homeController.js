import mysql from "mysql2"
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'udemy-jwt-backend'
})
const handleHelloWord = (req, res) => {
    return res.render("home.ejs")
}
const handleUser = (req, res) => {
    return res.render("user.ejs")
}
const handleCreateNewUser = (req, res) => {
    // return res.render("user.ejs")
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
    connection.query(
        'insert into users (email,password,username) values (?,?,?)', [email, password, username],
        function (err, result, fields) {
            if (err)
                console.log(err)
        }
    )
    return res.send('handleCreateNewUser')
}
module.exports = {
    handleHelloWord,
    handleUser,
    handleCreateNewUser
}