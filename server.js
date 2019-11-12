const express = require('express')
const path = require('path')
const mysql = require('mysql2')

const app = express()
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'password', 
    database: 'todo_db'
})

//  middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ----- item routes -----

// GET all items
app.get('/items', (req, res) => {
  db.query(`SELECT * FROM items`, (e, items) => {
    if (e) {
      console.log(e)
    }
    res.json(items)
  })
  
})

// POST one item
app.post('/items', (req, res) => {
  db.query(`INSERT INTO items (text, isDone) VALUES ("${req.body.text}", ${req.body.isDone})`, e => {
    if (e) {
      console.log(e)
    }
    res.sendStatus(200)
  })
  
})

// PUT(update) one item
app.put('/items/:id', (req, res) => {
  db.query(`UPDATE items SET isDone = ${req.body.isDone} WHERE id = ${parseInt(req.params.id)}`, e => {
    if (e) {
      console.log(e)
    }
    res.sendStatus(200)
  })
})

// DELETE one item
app.delete('/items/:id', (req, res) => {

  db.query(`DELETE FROM items WHERE id = ${parseInt(req.params.id)}`, e => {
    if (e) {
      console.log(e)
    }
    res.sendStatus(200)
  })
})

app.listen(3000)