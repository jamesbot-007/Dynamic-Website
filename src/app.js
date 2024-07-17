const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname , "../public");

// Say to express now , the b.d. path is not "views" it's "template/views"
const template_path = path.join(__dirname, "../templates/views")

app.set('view engine', 'hbs');
app.set('views', template_path);

// says to express hbs registed the partials so that we can use "navbar.hbs" inside "index.hbs"
const partials_path = path.join(__dirname, "../templates/partials")

hbs.registerPartials(partials_path)


app.use(express.static(staticPath));   
// When there is not index.html in public folder above line is useless


app.get("/",(req,res) => {
    // res.send("Home page");
    res.render("index");
});

app.get("/about",(req,res) => {
    // res.send("About Page");
    res.render("about")

    // Now, we can access the about page using the http://localhost:3000/about

});

app.get("/weather",(req,res) => {
    res.render("weather");
});

app.get("*",(req,res) => {
    res.render("404error", {
        errorMassage : "Opps! Page Not Found, Click here to go back"
    });
});


app.listen(port,() => {
    console.log(`The server is running on http://localhost:${port}`);
});