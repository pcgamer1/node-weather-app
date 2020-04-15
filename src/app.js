const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

pathAssets = path.join(__dirname,'../assets')
pathViews = path.join(__dirname,'../templates/views')
pathPartials = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', pathViews)
hbs.registerPartials(pathPartials)

app.use(express.static(pathAssets))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sarthak Saxena'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sarthak Saxena'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sarthak Saxena',
        help: 'Help'
    })
})
app.get('/weather', (req,res) => {
    if(req.query.address){
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, cast) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast:cast,
                    location,
                    address:req.query.address
                })
            })
        })
    }
    else {
        res.send({
            error: 'Please provide an address'
        })
    }
})
app.get('/help/*', (req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Sarthak Saxena',
        errmsg:'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name: 'Sarthak Saxena',
        errmsg:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

