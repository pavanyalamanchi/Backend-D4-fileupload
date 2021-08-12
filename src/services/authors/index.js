import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import uniqid from 'uniqid'


const authorRouter = express.Router()

const currentFilePath = fileURLToPath(
    import.meta.url)
const currentDirPath = dirname(currentFilePath)
const authorJSONPath = join(currentDirPath, 'authors.json')

authorRouter.get('/', (req, res) => {
    const fileContent = fs.readFileSync(authorJSONPath)
    res.send(JSON.parse(fileContent))
})

authorRouter.get('/:id', (req, res) => {
    const fileContent = fs.readFileSync(authorJSONPath)
    const authors = JSON.parse(fileContent)
    const author = authors.find(s => s.id === req.params.id)
    res.send(author)
})

authorRouter.post('/', (req, res) => {
    const { name, surname, email, dateOfBirth } = req.body
    const author = {
        id: uniqid(),
        name,
        surname,
        email,
        dateOfBirth,
        avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const fileContent = fs.readFileSync(authorJSONPath)
    const fileJSONArray = JSON.parse(fileContent)
    fileJSONArray.push(author)
    fs.writeFileSync(authorJSONPath, JSON.stringify(fileJSONArray))
    res.send(author)
})


authorRouter.delete('/:id', (req, res) => {
    const fileContent = fs.readFileSync(authorJSONPath)
    const fileJSONArray = JSON.parse(fileContent)
    const remainingAuthors = fileJSONArray.filter(s => s.id !== req.params.id)
    fs.writeFileSync(authorJSONPath, JSON.stringify(remainingAuthors))
    res.status(204).send()
})

//authorRouter.put('/:id')

export default authorRouter