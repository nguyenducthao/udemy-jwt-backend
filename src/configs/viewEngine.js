import express from "express"
/**
 * 
 * @param {*} app: express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public')) //cho phép trình duyệt truy cập vào folder public
    app.set("view engine", "ejs") // dịch ejs thành html
    app.set("views", "./src/views") // thư mục chứa các tập tin hiển thị trên trình duyệt
}

export default configViewEngine