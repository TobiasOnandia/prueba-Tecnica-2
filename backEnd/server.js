import express from 'express'
import cors from 'cors'
import {products} from './mock.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json()) //midddleware 
app.use(cors()) //enable cors
app.disable('x-powered-by')


app.get('/api/items', (req,res) => {
    
    if(req.query.q){
        const filteredProducts = products.filter(product => product.title.toLowerCase().includes(req.query.q.toLowerCase()))
        res.send(filteredProducts)
        return
    }



    res.send(products)
})


//filter product by params 

app.get('/api/items/:id', (req,res) => {
    const prod = products.filter(product => product.id === Number(req.params.id))
    res.send(prod)
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