const url = require('url')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var que = [];
var complete = [];

var superUser = process.env.superUser || "password";

var ourSuperSimpelLogger = function(req,res,next){
    console.log("Request ....");
    next();
}


app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());


//app.use(ourSuperSimpelLogger);

app.get('/', function (req, res) {
    let staticApp = readTextFile("public/index.html");
    
    res.send(staticApp);
});

app.get("/que", function (req, res) {
    res.json(que).end();
});

app.delete("/que/:name/:password",ourSuperSimpelLogger, function (req, res) {
    let name = req.params.name;
    let resPassword = req.params.password;

    if (resPassword == superUser) {

        if (name) {
            name = name.toLowerCase();
            let index = que.findIndex(item => {
                return item === name;
            });

            if (index >= 0) {
                complete.push(name);
                que.splice(index, 1);
            }

            res.json(que);

        }
    } else {

        res.status(403).json(que);
    }

});

app.post('/que/', ourSuperSimpelLogger, function (req, res) {

    res.setHeader('')
        
    let name = req.body.name;

    console.log(name)

    if (name) {
        name = name.toLowerCase();
        let index = que.findIndex(item => {
            return item === name;
        })

        if (index == -1) {
            que.push(name);
        }

    }

    res.json(que);

});

app.listen(app.get('port'), function () {
    console.log('SOS server running', app.get('port'));
});