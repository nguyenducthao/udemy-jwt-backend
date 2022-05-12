require("dotenv").config()
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser"
import connection from "./config/connectDB";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";

const app = express()

configViewEngine(app)

//config CORS
configCors(app)

//config body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// config cookie parser
app.use(cookieParser())

connection()
initWebRoutes(app)
initApiRoutes(app)
app.use((req, res) => {
    return res.send('404 not found')
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('>>> JWT Backend is running on the port = ', PORT)
})
