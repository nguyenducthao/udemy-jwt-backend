import express from "express";
import { append } from "express/lib/response";
const router = express.Router()
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello world")
    })
    return app.use("/", router)
}
export default initWebRoutes