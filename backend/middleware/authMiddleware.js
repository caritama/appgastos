const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const user = require('../models/userModel')

const protect = asyncHandler(async (req, res, next)=> {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //obtener el token del header ( Bearer Token)

            token = req.headers.authorization.split(' ')[1]
            //Verificamos la firma
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtenemos la info del usuariodel token
            req.user = await user.findById(decoded.id).select('-password')
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ('Acceso no autorizado')
        }
    }

    if(!token){
        res.status(401)
        throw new Error ('Acceso no autorizado sin Token')
    }
}) 

module.exports = {protect}