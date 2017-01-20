/**
 * Created by Divya Chopra on 1/14/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
router.use(function (req, res, next) {
    if(req.method==="GET"){
        return next();
    }

    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/#login');
});
router.route('/posts')

    .get(function(req,res){
        console.log('debug get');
        Post.find(function(err, posts){
            if(err){
                console.log('Error: ' + err);
                return res.send(500,err);
            }
            return res.send(200,posts);
        });
    })

    .post(function(req,res){
        var post = new Post();
        post.text = req.body.text;
        post.created_by = req.body.created_by;
        post.save(function(err,post){
           if(err){
               console.log('Error: ' + err);
               return res.send(500,err);
           }
            return res.json(post);
        });
    });

router.route('/posts/id')

    .get(function(req,res){
        Post.findById(req.params.id, function(err, post){
           if(err)
               res.send(err);

           res.json(post);
        });
    })
    .put(function(req,res){
        Post.findById(req.params.id, function(err, post){
           if(err) res.send(err);

           post.username = req.body.created_by;
           post.text = req.body.text;

           post.save(function(err,post){

               if(err)
                   res.send(err);

               res.json(post);
           });
        });
    })
    .delete(function(req,res){
        Post.remove({
            _id: req.params.id
        }, function(err) {
            if(err)
                res.send(err);

            res.json("deleted :(");

        });
    });

module.exports = router;
