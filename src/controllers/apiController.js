import loginRegisterService from '../services/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}
const handleRegister = async (req, res) => {
    // console.log('req: ', req.body)
    try {
        if (!req.body.email || !req.body.phone || !req.body.username || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters', //error message
                EC: '1',//error code
                DT: '' //data
            })
        }
        if (req.body.password && req.body.password.length < 3) {
            return res.status(200).json({
                EM: 'Your password must have more than 3 characters', //error message
                EC: '1',//error code
                DT: '' //data
            })
        }
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC,//error code
            DT: '' //data
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1',//error code
            DT: 'new user created fail' //data
        })
        console.log(e)
    }
}
module.exports = {
    testApi,
    handleRegister
}