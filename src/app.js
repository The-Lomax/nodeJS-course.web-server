// imports
const geocode = require('../public/js/geocoords')
const forecast = require('../public/js/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT;

// Define paths for Express configuration
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicPath))

// Setup serving files on addresses
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather forecast',
        name: 'Chris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me page",
        name: 'Chris',
        age: 31,
        loc: 'Warsaw'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        name: "Chris",
        str: 'Look after yourself.'
    })
})

app.get('/forecast', (req, res) => {
    // res.send({
    //     back: "http://localhost:3000/",
    //     title: "Weather forecast",
    //     name: "Chris",
    //     location: 'Warsaw',
    //     forecast: 'Sunny'
    // })
    if (!req.query.city) {
        return res.render('forecast', {
            name: "Chris",
            title: "Weather forecast"
        })
    } else {
        geocode.getCoords(req.query.city, (city, coords) => forecast.getWeather(city, coords, (error, data) => {
            if (error) {
                return res.send(error);
            }
            res.send(data);
        }));
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Search term is mandatory"
        });
    } else {
        let queryParams = {};
        for (el in req.query) { queryParams[el] = req.query[el]; }
        res.send({
            queryParams
        });
    }
    
})

app.get('/help/*', (req, res) => {
    // res.send({
    //     error: {
    //         type: "HTTP404: FileNotFound",
    //         statusCode: 404,
    //         message: "File not found.",
    //         categoryError: "Help webpage not found error.",
    //         reverseLink: "http://localhost:3000/"
    //     }
    // })
    res.render('404', {
        title: "404 Error",
        name: "Chris",
        message: "Help article not found."
    })
})

app.get('*', (req, res) => {
    // res.send({
    //     error: {
    //         type: "HTTP404: FileNotFound",
    //         statusCode: 404,
    //         message: "File not found.",
    //         reverseLink: "http://localhost:3000/"
    //     }
    // })
    showError(res, '404', 'Web page not found')
})

function showError(res, vModel, eMsg){
    res.render(vModel, {
        title: "404 Error",
        name: "Chris",
        message: eMsg
    })
}

app.listen(port, () => console.log('Server started on port ' + port + "."))