const express = require('express')
const generate = require('shortid').generate
const app = express()
app.use(express.json())
const PORT = 5000

let users = [
    {
        id: generate(),
        name: "John",
        bio: "Hello"
    }
]

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.post('/users', (req, res) => {
    const { name, bio } = req.body
    if(!name || !bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user."
        })
    } else {
        const newUser = { id: generate(), name, bio }
        users.push(newUser)
        res.status(201).json(newUser)
    }
})