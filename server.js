require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const shortURL = require('./models/shortURL')
const PORT = process.env.PORT || 8000
const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error(err))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const shortURLs = await shortURL.find()
    res.render('index', { shortURLs : shortURLs })
})

app.post('/shortenURL', async (req, res) => {
    await shortURL.create({ fullURL: req.body.fullURL })
    res.redirect('/')      
})

app.get('/:shortURL', async (req, res) => {
    const url = await shortURL.findOne({ shortURL: req.params.shortURL })
    if (url == null) return res.sendStatus(404)
    url.clicks += 1
    await url.save()

    res.redirect(url.fullURL)
})  

app.listen(PORT, () => console.log(`Running on port ${PORT}`))