/**
 * Created by Divya Chopra on 1/15/2017.
 */
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var users = {};
module.exports = function(passport){
    passport.serializeUser(function(user,done){
       console.log('seroalizing user:', user.username);
       return done(null, user.username);
    });

    passport.deserializeUser(function(username, done){
       return done(null, users[username]);
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback:true
    },
        function (req,username,password,done) {

            User.findOne({username: username}, function (err, user) {
                if (err) {
                    return done(err, false);
                }

                if (!user) {
                    return done('user ' + username + ' not found', false)

                }
                if (!isValidPassword(user, password)) {
                    return done('incorrect password', false);
                }
                return done(null, user);
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
        function(req, username, password, done){
        Users.findOne({username: username}, function(err, user){
          if(err){
              return done(err, false);
          }
          if(user){
              return done('username already taken', false);
          }
            user= new Users();
            user.username= username;
            user.password= createHash(password);
            user.save(function(err,user){

                if(err){
                    return done(err,false);
                }
                console.log('successfully signed up user' +username);
                return done(null, user);
            });
        });


            return done(null, users[username]);
        })
    );

    var isValidPassword = function(user, password){
      return bcrypt.compareSync(password, user.password);
    };

    var createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };
};
