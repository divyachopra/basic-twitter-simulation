/**
 * Created by Divya Chopra on 1/15/2017.
 */
var mongoose = require('mongoose');
var Users = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

//var Posts = mongoose.model('Post');
//var users = {};
module.exports = function(passport){
    passport.serializeUser(function(user,done){
       console.log('serializing user:', user.username);
       return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            console.log('deserializing user:',user.username);
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
        function (req,username,password,done) {

            Users.findOne({'username' : username},
                function (err, user) {
                if (err) {
                    console.log('error'+err);
                    return done(err);
                }

                if (!user) {
                    console.log('User Not Found with username '+username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
        function(req, username, password, done){
        Users.findOne({'username': username}, function(err, user){
          if(err){
              console.log('Error in signup: '+ err);
              return done(err);
          }
          if(user){
              console.log('username already taken', +username);
              return done(null, false);
          }
          else {
              console.log('user does not exists');
              var newUser = new Users();
              newUser.username = username;
              newUser.password = createHash(password);
              newUser.save(function (err) {

                  if (err) {
                      console.log('Error in saving user: '+ err);
                      throw err;
                  }
                  console.log('successfully signed up user' + newUser.username);
                  return done(null, newUser);
              });
          }
        });
        })
    );

    var isValidPassword = function(user, password){
      return bcrypt.compareSync(password, user.password);
    };

    var createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };
};
