var express = require('express');
var axios = require('axios');

var app = express()

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/static', express.static('public'));
app.set('view engine', 'ejs');

function generateRand(){
    return Math.floor(Math.random() * 2682);
}

function generateURL(){
    randNum = generateRand();
    url = 'https://xkcd.com/' + String(randNum) + '/info.0.json'
    return url
}

app.get('/', function(req, res){
    axios.get(generateURL()).then(function(response){
        console.log({comicData: response.data})
        res.render('comic.ejs', {comicData: response.data});
    }).catch(function(error){
        res.json({'Error: ': error})
    })
})

app.listen(3000, function(){
    console.log('app listening on port 3000')
})