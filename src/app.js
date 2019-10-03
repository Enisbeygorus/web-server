const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');
const viewsPath = path.join(__dirname, '../templates/views');



app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
       res.render('index', {
           title: 'Weather',
           name: 'Seeek',
           createdBy: 'Enis'
       }); 
});

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        name: 'Eniss',
        createdBy: 'Enis'
    }); 
});


app.get('/help', (req, res) => {
    res.send('Help Page'); 
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Some Header',
        errorMsj: 'Help article not found'
    }); 
});


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'You must provide a search address'})
    }

    geocode(req.query.address, (error1, {latitude, longitude, location} = {}) => {
        if(error1) {
            return res.send({
                error: error1
            })
        }
        forecast(latitude, longitude,(error2, forecastData) => {
            if(error2) {
                return res.send({
                    error: error2
                })
            }
            res.send({
                location: location,
                forecastData: forecastData,
                address: req.query.address
            })
        })
    })

    
});

app.get('/product',(req,res) => {
    if(!req.query.search) {

        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Some header2',
        errorMsj: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up to port 3000');
});