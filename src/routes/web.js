import express from "express";
import homeController from './/../controllers/homeController'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWord)
    router.get("/user", homeController.handleUser)
    return app.use("/", router)
}
export default initWebRoutes