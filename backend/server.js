//const { application } = require('express')
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//app.use('/api/tareas', require('./routes/tareaRoutes'))
app.use('/api_v1/users', require('./views/userViews'))

app.use(errorHandler)
app.listen(port, ()=>console.log(`El servidor inicio en el puerto "${port}"`))

