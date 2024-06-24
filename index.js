const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")

require("./db")
require("dotenv").config()
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/a/", require("./routes/admin/adminRoutes"))
app.use("/api/v1/b", require("./routes/restaurant/restaruantRotues"))

app.listen(process.env.PORT || 8000, () => {
    console.log("server is started");
})