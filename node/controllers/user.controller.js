const User = require('../models/user.model');
const {
  registerUser,
  loginUser,
  editUser,
  editPassword
} = require('../helpers/validationsHelper');
const { Validation, Api, ApiMessage } = require('../helpers/errorsHelper');
const { jwtSecret } = require('../config/config');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const register = body => {
  return new Promise((resolve, reject) => {
    const { email, username, password } = body;

    try {
      registerUser(body)
        .then(() => {
          User.findOne({ email }).then(user => {
            if (user) reject(ApiMessage('User already exists !'));

            const newUser = new User({
              email,
              username,
              password
            });

            newUser
              .save()
              .then(savedUser => {
                resolve(savedUser);
              })
              .catch(err => {
                reject(Api(err));
              });
          });
        })
        .catch(err => {
          reject(Validation(err));
        });
    } catch (err) {
      reject(Api(err));
    }
  });
};

const login = body => {
  return new Promise((resolve, reject) => {
    const { username, password } = body;

    try {
      loginUser(body)
        .then(() => {
          User.findOne({ username }).then(user => {
            if (!user) reject(ApiMessage("Account doesn't exist"));

            bcrypt.compare(password, user.password, (err, result) => {
              if (!result)
                reject(ApiMessage('Your password or username is incorrect !'));

              const token = sign(
                {
                  userID: user._id
                },
                jwtSecret,
                { expiresIn: 18000 }
              );

              user.token = token;

              resolve(user);
            });
          });
        })
        .catch(err => {
          reject(Validation(err));
        });
    } catch (err) {
      reject(Api(err));
    }
  });
};

const getOne = _id => {
  return new Promise((resolve, reject) => {
    try {
      User.findOne({ _id })
        .lean()
        .exec()
        .then(user => {
          delete user.password;
          delete user.createdAt;
          delete user.__v;
          resolve(user);
        })
        .catch(err => {
          reject({ err: Validation(err) });
        });
    } catch (err) {
      reject({ err: Api(err) });
    }
  });
};

const getMany = () => {
  return new Promise((resolve, reject) => {
    try {
      User.find()
        .lean()
        .exec()
        .then(users => {
          const finalUsers = users.map(user => {
            delete user.password;
            delete user.createdAt;
            delete user.__v;
            return user;
          });
          resolve(finalUsers);
        });
    } catch (err) {
      reject(Api(err));
    }
  });
};

const edit = (_id, body) => {
  return new Promise((resolve, reject) => {
    try {
      editUser(body)
        .then(() => {
          User.findOneAndUpdate({ _id }, body, {
            new: true
          })
            .exec()
            .then(user => {
              resolve(user);
            })
            .catch(err => {
              reject(Api(err));
            });
        })
        .catch(err => {
          reject(Validation(err));
        });
    } catch (err) {
      reject(Api(err));
    }
  });
};

const editPwd = (_id, body) => {
  const { oldPassword, newPassword } = body;
  return new Promise((resolve, reject) => {
    try {
      editPassword(body)
        .then(() => {
          User.findById(_id).then(user => {
            if (user)
              user.comparePassword(user, oldPassword, (err, match) => {
                if (!match) reject(ApiMessage('Password is incorrect'));
                user.password = newPassword;
                user.save().then(user => {
                  resolve(user);
                });
              });
          });
        })
        .catch(err => {
          reject(Validation(err));
        });
    } catch (err) {
      reject(Api(err));
    }
  });
};

module.exports = { register, login, getMany, getOne, edit, editPwd };
