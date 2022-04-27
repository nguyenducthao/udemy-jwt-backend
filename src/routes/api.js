import express from "express";
import apiController from "../controllers/apiController";
import userController from '../controllers/userController'

const router = express.Router()

const initApiRoutes = (app) => {
    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.get("/users/read", userController.readFunc)
    router.post("/users/create", userController.createFunc)
    router.put("/users/update", userController.updateFunc)
    router.delete("/users/delete", userController.deleteFunc)
    return app.use("/api/v1/", router)
}
export default initApiRoutes