import express from 'express'
import multer from 'multer'
import fs from 'fs'
import { saveProfilePicture, fileFolderPath, publicFolderPath } from '../../lib/fs-tools.js'
import uniqid from 'uniqid'
import { join } from 'path'


const fileRouter = express.Router()

fileRouter.post('/:id/uploadAvatar', multer().single('profilePic'), async(req, res, next) => {
    try {
        console.log(req.file)
        await saveProfilePicture(req.file.originalname, req.file.buffer)

        res.send('uploaded!')
    } catch (error) {
        next(error)
    }
})

fileRouter.post('/', async(req, res) => {
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

    const fileContent = fs.readFileSync(fileFolderPath)
    const fileJSONArray = JSON.parse(fileContent)
    fileJSONArray.push(author)
    fs.writeFileSync(fileFolderPath, JSON.stringify(fileJSONArray))
    res.send(author)
})

fileRouter.get('/', async(req, res) => {
    const fileContent = fs.readFileSync(fileFolderPath)
    res.send(JSON.parse(fileContent))
})

export default fileRouter