import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config()
import bodyParser from "body-parser"
import connection from "./config/connectDB";
import configCors from "./config/cors";
const app = express()

configViewEngine(app)
//config CORS
configCors(app)
//config body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
connection()
initWebRoutes(app)
initApiRoutes(app)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('>>> JWT Backend is running on the port = ', PORT)
})
