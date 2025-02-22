const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    nbrOfLikes: Number
});

const Article = mongoose.model('article', articleSchema);
module.exports = Article;
