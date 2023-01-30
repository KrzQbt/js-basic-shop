const jwt = require('jsonwebtoken');

const User = require('../domain/user')



exports.getUser = (req,res,next) =>{

    User.findAll()
    .then( users => {
        res.status(200).json(
            {
                // success: true,
                userList: users
            }
        );
    })
    
    ;
}

exports.login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ username: username })
      .then(user => {
        if (!user) {
          const error = new Error('Username not found');
          error.statusCode = 401;
          throw error;
        }
        loadedUser = user;

        return password == user.password
      })
      .then(isEqual => {
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            username: loadedUser.username,
            userId: loadedUser._id
            // userId: loadedUser._id.toString()
            
          },
          'signsecret',
          {  } // not expiring for now
        );
        res.status(200).json({ token: token, userId: loadedUser._id });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };