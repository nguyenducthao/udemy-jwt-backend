import express from "express";
import homeController from './/../controllers/homeController'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWord)
    router.get("/about", (req, res) => {
        return res.send("Hello thaond")
    })
    return app.use("/", router)
}
export default initWebRoutes