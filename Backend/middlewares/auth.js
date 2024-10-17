const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; 

const authenticateToken = (request,response,next) =>{
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return response.status(401).json({message: 'Unauthorized: Token is missing'});
    }

    jwt.verify(token, JWT_SECRET, (error,user)=>{

        if(error){
            return response.status(403).json({ message: 'Forbidden: Invalid token' })
        }
        request.user = user;
        next();
    });

};


module.exports = authenticateToken;

