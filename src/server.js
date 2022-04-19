import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config()
import bodyParser from "body-parser"
const app = express()
configViewEngine(app)

//config body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

initWebRoutes(app)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('>>> JWT Backend is running on the port = ', PORT)
})