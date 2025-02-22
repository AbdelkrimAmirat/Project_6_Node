
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const Article = require("./models/article");

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to My MongoDB');
    })
.catch((err) => {      
    console.log('Failed to connect to My  MongoDB', err);
    }); 

// **********************************

app.get('/hello', (req, res) => {
    res.send('Hello World!');
    });

app.get('/numbers1', (req, res) => {
    numbers = "";
    for (let i=0; i<= 100; i++) {
        numbers += i + "-"
    }
    res.send(` The numbers are :${numbers}`);
    });

app.get('/numbers2', (req, res) => {
    numbers = "";
    for (let i=0; i<= 100; i++) {
        numbers += i + "-"
    }
    //res.sendFile(__dirname + '/views/numbers.ejs');
    //res.send(` <h1> Salem </h1> The numbers are :${numbers}`);
    res.render('numbers.ejs', {
        numbers: numbers,
        name : 'Abdelkrxim'});
    });

app.get('/add/:num1/:num2', (req, res) => {
    let num1 = Number(req.params.num1);
    let num2 = Number(req.params.num2);
    let sum = num1 + num2;   
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
    });

app.get('/sayHello1', (req, res) => {
    let name = req.body.name;
    let age = req.query.age;
    res.send(`Hello ${name}, you are ${age} years old`);
    });

app.get('/sayHello2', (req, res) => {
    let name = req.body.name;
    let age = req.query.age;
    res.json({
        name: name,
        age: age
    });
    });

app.get('/test', (req, res) => {
    res.send('You visited test');
    });

app.post('/addComment', (req, res) => {
    res.send('Post request on add Comment');
    });

    // =========  ARTICLES ENDPOINTS   =============//

app.post('/articles1', async(req, res) => {
    const newArticle = new Article({
        title: "mySecondArticle",
        content: "yyyyyyyyyyyyyyyyyy",
        nbrOfLikes: 88888
    });  

    await newArticle.save()
    res.send('the new article has been stored');
   
    });

    app.post('/articles2', async(req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
            nbrOfLikes: req.body.nbrOfLikes
        })
        await newArticle.save()
        res.json(newArticle);
        });  
    
    app.get('/articles', async(req, res) => {
        const articles = await Article.find();
        console.log("the articles are : ", articles);
        res.json(articles);
        });

    app.get('/articles/:articleId', async(req, res) => {
        const articleId = req.params.articleId;
        const article = await Article.findById(articleId);
        res.json(article);
        }
    );

    
    app.delete('/articles/:articleId', async(req, res) => {
        const Id = req.params.articleId;
        const article = await Article.findByIdAndDelete(Id);
        console.log("The article deleted is : ", article);
        res.json(article);  
        }
    );

    app.patch('/articles/:articleId', async(req, res) => {
        const Id = req.params.articleId;
        const article = await Article.findById(Id);
        article.title = req.body.title;
        article.content = req.body.content;
        article.nbrOfLikes = req.body.nbrOfLikes;
        await article.save();
        console.log("The article Updated is : ", article);
        res.json(article);  
        }
    );

app.get("/showArticle", async(req, res) => {
    const articles = await Article.find();
    res.render('articles.ejs', {
        allArticles: articles });

    });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);

    }); 

