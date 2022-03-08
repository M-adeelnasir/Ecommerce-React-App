const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const morgan = require('morgan')
const fs = require('fs')
const routes = fs.readdirSync('./routes')
const connectDB = require('./dotenvVariables/db')

dotenv.config({ path: "./dotenvVariables/config.env" })

const app = express()
const PORT = process.env.PORT || 5000
connectDB()
if (process.env.NODE_ENV = "development") {
    // app.use(morgan) //use as middleware log your requests in console
    app.use(morgan('dev')); //
}
app.use(cors()) //will able to run server and client on diffrenet doamin or ports
app.use(express.json())
routes.map((r) => app.use('/api/v1', require('./routes/' + r)))



const server = app.listen(PORT, console.log(`Backend is listening ${process.env.NODE_ENV} at port ${PORT}`.brightCyan.bold))
//unhandleRejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`ERROR : ${err.message}`);
    server.close(() => process.exit(1))
})