import userService from '../services/userService'

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
    userService.createNewUser(email, password, username)
    return res.send('handleCreateNewUser')
}
module.exports = {
    handleHelloWord,
    handleUser,
    handleCreateNewUser
}