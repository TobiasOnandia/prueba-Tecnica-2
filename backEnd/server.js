import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors()) //enable cors


app.get('/',  (req,res) => {
    res.send({message: 'hello worlds'})
})


app.get('/items', (req,res) => {
    res.send({message: 'pagina items'})
})



app.get('/items/:id', (req,res) => {
    res.send("pagina del detalle")
})

app.post()


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})