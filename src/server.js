import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import authorRouter from './services/authors/index.js'
import fileRouter from './services/files/index.js'


const server = express()
const port = 3011


server.use(cors())
server.use(express.json())

server.use('/authors', authorRouter)
server.use('/author', fileRouter)
console.table(listEndpoints(server))

server.listen(server, port, () => {
    console.log(`listening on ${port}`)
})