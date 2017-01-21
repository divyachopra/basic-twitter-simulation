/**
 * Created by Divya Chopra on 1/16/2017.
 */
var mongoose =  require('mongoose');
//var Schema = mongoose.Schema;
var userSchema= new mongoose.Schema({
    username: String,
    password: String,
    created_at:{type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
    text: String,
    created_by : String,
    created_at:{type: Date, default: Date.now}
});

mongoose.model('User', userSchema);
mongoose.model('Post', postSchema);