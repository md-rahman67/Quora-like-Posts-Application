const express = require("express");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

const path = require("path"); // to access views and public folder from index.js we require path;

const app = express();
const port = 8080;

app.use(methodOverride('_method')); //to use https verbs like PUT & DELETE
app.use(express.urlencoded({ extended: true })); // to read POST request data we have to parse
// app.use(express.json());

app.set("view engine", "ejs"); // to render ejs file set "view engine" to "ejs"

app.set("views", path.join(__dirname, "views")); // set path for views folder;
app.use(express.static(path.join(__dirname, "public"))); // set express.static path for public folder to access static files .js & .css;


let posts = [
    {
        id: uuidv4(),
        username: "Modi",
        content: "Tum jhaadu lagao, Mai chala Videsh Ghumne!",
        likes: 0
    },
    {
        id: uuidv4(),
        username: "Mr.Doland Trump",
        content: "You know, it doesn't really matter what they write as long as you've got a young and beautiful piece of ass.",
        likes: 0
    },
    {
        id: uuidv4(),
        username: "Xi Jinping",
        content: "too young, too simple, sometimes naive",
        likes: 0
    }
];

// GET all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

// GET form for new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})


// POST -> add new post
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    likes = 0;
    let pushed = posts.push({ id, username, content, likes });
    if (pushed) {
        res.redirect("/posts");
    }
})

// GET single post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => {
        return id === p.id;
    })

    res.render("show.ejs", { post });
})

// PATCH -> update partially data = content
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => {
        return id === p.id;
    })
    post.content = newContent;
    res.redirect("/posts");
})

//GET update post form route
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => {
        return id === p.id;
    })
    res.render("edit.ejs", { post });
})

// DELETE post using delete request
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.findIndex((p) => {
        return id === p.id;
    })
    posts.splice(post, 1);
    res.redirect("/posts");
})

// GET posts by username
app.get("/search", (req, res) => {
    let { username } = req.query;
    let allPost = posts.filter((p) => {
        return username === p.username;
    })

    res.render("userAllPosts.ejs", { allPost, username });
})

//POST - Like button
app.post("/posts/:id/likes", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => {
        return id === p.id;
    })
    post.likes++;
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`App is listening to this port ${port}`);
})