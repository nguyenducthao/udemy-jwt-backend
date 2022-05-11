import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config()
import bodyParser from "body-parser"
import connection from "./config/connectDB";
import configCors from "./config/cors";
const app = express()
import { createJWT, verifyToken } from './middleware/JWTAction'

configViewEngine(app)
//config CORS
configCors(app)
//config body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
connection()
createJWT()
let decodedData = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmd1eeG7hW4gxJHhu6ljIHRo4bqjbyIsImVtYWlsIjoibmR0aGFvZG5nQGdtYWlsLmNvbSIsImlhdCI6MTY1MjI3MTMxMX0.YxKCeNALQS9p1eKFTU9zorNGyXMqA2tRE3crWtSfAQE')
console.log('decodedData: ', decodedData)
initWebRoutes(app)
initApiRoutes(app)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('>>> JWT Backend is running on the port = ', PORT)
})
