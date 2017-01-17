/**
 * Created by Divya Chopra on 1/14/2017.
 */
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.method==="GET"){
        return next();
    }

    if(!req.isAuthenticated()){
        res.redirect('/#login');
    }
    return next();
});
router.route('/posts')

    .get(function(req,res){

        res.send({message: 'TODO return all posts'});
    })

    .post(function(req,res){
       res.send({message: 'TODO create a new post'});
    });

router.route('/posts/id')

    .get(function(req,res){
        res.send({message:'TODO return all posts with ID' + req.params.id});
    })
    .put(function(req,res){
        res.send({message:'TODO modify posts with ID' + req.params.id});
    })
    .delete(function(req,res){
        res.send({message:'TODO delete all posts with ID' + req.params.id});
    });

module.exports = router;
