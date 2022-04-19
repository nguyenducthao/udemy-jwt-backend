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
    let getUserByEmail = await userService.getUserByEmail('admin@gmail.com')
    if (getUserByEmail) {
        alert('This email is exist')
        return
    }
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
module.exports = {
    handleHelloWord,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser
}