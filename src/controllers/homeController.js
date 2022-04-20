import userService from '../services/userService'

const handleHelloWord = (req, res) => {
    return res.render("home.ejs")
}
const handleUserPage = async (req, res) => {
    try {
        let userList = await userService.getUserList()
        return res.render("user.ejs", { userList })
    } catch (e) {
        console.log(e)
    }

}
const handleCreateNewUser = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
    await userService.createNewUser(email, password, username)
    // return res.send('handleCreateNewUser')
    return res.redirect('/user')
}
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect('/user')
}
const getUpdateUserPage = async (req, res) => {
    let user = await userService.getUserById(req.params.id)
    let userData = {}
    if (user) {
        userData = user
    }
    return res.render("user-update.ejs", { userData })
}
const handleUpdateUser = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let id = req.body.id
    await userService.updateUser(id, email, username)
    return res.redirect('/user')
}
module.exports = {
    handleHelloWord,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser
}