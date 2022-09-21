const jwt = require('jsonwebtoken');

const getJWT = (uid = '') => {
  return new Promise((resolve, rejected) => {
    const payload = { uid };
    //console.log("------ " + process.env.SECRET_KEY);
    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1h'
    }, (err, token) => {
      if(err){
        console.log(err);
        rejected('token error')
      } else {
        resolve(token)
      }
    });
  })
}

module.exports = {
    getJWT
}