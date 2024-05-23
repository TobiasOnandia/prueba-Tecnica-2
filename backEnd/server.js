import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json()) //midddleware 
app.use(cors()) //enable cors
app.disable('x-powered-by')

app.get('/',  (req,res) => {
    res.send({message: 'hello worlds'})
})


app.get('/items', (req,res) => {
    res.send({message: 'pagina items'})
})


app.get('/items/:id', (req,res) => {
    res.send("pagina del detalle")
})


app.post('items', (req,res) => {
    res.status(201).json(req.body)
})


app.use((req,res) => {
    res.status(404).send('<h1>404</h1>')
})



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})