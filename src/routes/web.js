import express from "express";
import homeController from './/../controllers/homeController'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWord)
    router.get("/user", homeController.handleUserPage)
    router.post("/users/create-user", homeController.handleCreateNewUser)
    router.post("/users/delete-user/:id", homeController.handleDeleteUser)
    router.get("/users/update-user/:id", homeController.getUpdateUserPage)
    router.post("/users/update-user", homeController.handleUpdateUser)
    return app.use("/", router)
}
export default initWebRoutes