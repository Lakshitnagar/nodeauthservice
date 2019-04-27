// jwt service
const jwtService = require('../jwt/jwtService');
// Database
const { findUserByRefreshToken } = require('../mongodb/operations/operation');

module.exports = {
    authenticate: function (req, res, next) {
        const token = req.cookies['jwt'];
        const refreshToken = req.cookies['refreshToken'];
        if(!token){
            res.status(401).send({
                error: 'unauthorized access',
                msg: 'please login or register first'
            });

            return;
        }

        jwtService.verifyToken(token).then((payload) => {
            res.locals.uuid = payload.uuid;
            return next();
        }).catch((err) => {
            console.log('err.name', err.name);
            console.log('err.name', err.name == 'TokenExpiredError');
            if(err.name == 'TokenExpiredError'){
                findUserByRefreshToken(refreshToken).then((user)=>{
                    if(!user){
                        res.status(400).send({
                            error: err,
                            msg: 'please login or register first'
                        });

                        return;
                    }
                    else{
                        jwtService.generateToken({ uuid: user.uuid }).then((reToken) => {
                            res.locals.uuid = user.uuid;
                            res.cookie('jwt', reToken, { httpOnly: true });
                            return next();
                        }).catch((err) => {
                            res.status(500).send({
                                error: 'token generation',
                                msg: 'error while generating token'
                            });
                        });
                    }
                }).catch((err)=>{
                    res.status(err.code).send({
                        error: err,
                        msg: 'internal error'
                    });

                    return;
                });
            }
            else{
                res.status(401).send({
                    error: err,
                    msg: 'please login or register first last'
                });
    
                return;
            }
        });
    }
};
