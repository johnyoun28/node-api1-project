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
    const{ name, bio } = req.body
    try {
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user."
            })
        } else {
            const newUser = { id: generate(), name, bio }
            users.push(newUser)
            res.status(201).json(newUser)
        }
    } catch(error) {
        res.status(500).json({
            message: "There was an error while saving the user to the database" 
        })
    }
})

app.get('/api/users/:id', (req,res) => {
    const { id } = req.params
    const user = users.find(user => user.id === id )
    try {
        if(!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        } else {
            res.status(200).json(user)
        }
    } catch(error) {
        res.status(500).json({
            message: "The user information could not be retrieved."
        })
    }
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params
    try {
        if (!users.find(user => user.id === id)) {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        } else {
            users = users.filter(user => user.id !== id)
            res.status(200).json({
                message: `Dog with id ${id} got deleted!`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

app.put('/api/users/:id', (req, res) => {
    const { id } = res.params
    const { name, bio } = res.body
    const indexOfUsers = users.findIndex(user => user.id === id)
    try {
        if (indexOfUsers !== -1) {
            users[indexOfUsers] = { id, name, bio };
            res.status(200).json({id, name, bio})
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    } catch(error) {
        res.status(500).json({
            message: "The user information could not be modified."
        })
    }
})



app.use('*', (req,res) => {
    res.status(404).json({
        message: "Not Found!"
    })
})

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})