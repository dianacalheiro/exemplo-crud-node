const express = require('express')
const bodyParser = require('body-parser')
const mySql = require('mysql')
const exphbs = require('express-handlebars')

const app = express()

const urlEncodeParser = bodyParser.urlencoded({
    extended: false
})
const sql = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
})

sql.query("use bd_nodejs")

// Template Engine

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')

app.use('/css', express.static('css'))
app.use('/js', express.static('js'))

// Routes and Templates
app.get("/", function (req, res) {
    res.render('index')
})

app.get("/insert", function (req, res) {
    res.render('insert')
})

app.get("/select/:id?", function (req, res) {
    if (!req.params.id) {
        sql.query("SELECT * FROM tbl_user ORDER BY id ASC", function (err, results, field) {
            res.render('select', {
                data: results
            })
        })
        
    } else {
        sql.query("SELECT * FROM tbl_user WHERE id=? ORDER BY id ASC", [req.params.id], function (err, results, field) {
            res.render('select', {
                data: results
            })
        })
    }
})

app.get("/delete/:id", function (req, res) {
    sql.query("DELETE FROM tbl_user WHERE id=?", [req.params.id])
    res.render('delete', {
        id: req.params.id
    });
})

app.get("/update/:id", function (req, res) {
    sql.query("SELECT * FROM tbl_user WHERE id=?", [req.params.id], function (err, results, field) {
        res.render('update', {
            id: req.params.id,
            name: results[0].name,
            email: results[0].email,
            age: results[0].age
        })
    })
})

app.post("/controllerUpdate",urlEncodeParser, function (req, res) {
    sql.query("UPDATE tbl_user set name=?, email=?, age=? WHERE id=?", [req.body.name, req.body.email, req.body.age, req.body.id])
    res.render('controllerUpdate',{
        name: req.body.name
    })
})

app.post("/controllerForm", urlEncodeParser, function (req, res) {
    sql.query("INSERT INTO tbl_user values(?,?,?,?)", [req.body.id, req.body.name, req.body.email, req.body.age])
    res.render('controllerForm', {
        name: req.body.name
    })
})

// Server start
app.listen(4040, function (req, res) {
    console.log('Server Rodando!')
})