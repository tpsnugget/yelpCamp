var express = require('express')
var app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
   res.render('landing')
})

app.get('/campgrounds', (req, res) => {
   var campgrounds = [
      {name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' },
      {name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80' },
      {name: "Mountain Goat's Rest", image: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80'}
   ]
   res.render('campgrounds', {campgrounds: campgrounds})
})

app.listen(3000, process.env.IP, () => { console.log('The yelpCamp Server is running!!') })