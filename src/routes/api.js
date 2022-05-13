import express from "express";
import apiController from "../controllers/apiController";
import userController from '../controllers/userController'
import groupController from '../controllers/groupController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'

const router = express.Router()

const initApiRoutes = (app) => {
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.get("/users/read", checkUserJWT, checkUserPermission, userController.readFunc)
    // router.get("/users/read/?page=?&limit=?", userController.readFunc)
    router.post("/users/create", userController.createFunc)
    router.put("/users/update", userController.updateFunc)
    router.delete("/users/delete", userController.deleteFunc)
    router.get("/group/read", groupController.readFunc)

    return app.use("/api/v1/", router)
}
export default initApiRoutes