const url = require('url')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var que = [];
var complete =[];

var superUser = process.env.superUser || "password";

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  let staticApp = readTextFile("public/index.html");
  res.send(staticApp);
});

app.get("/que",function(req,res){
    res.json(que).end();
});

app.delete("/que/:name",function(req,res){
    let name = req.params.name;

    if(name){
        name = name.toLowerCase();
        let index = que.findIndex(item =>{
            return item === name;
        });

        if(index >= 0){
            complete.push(name);
            que.splice(index,1);
        }

        res.json(que);

    }

});

app.post('/que/:name', function(req, res) {

    let name = req.params.name;

    console.log(name)

    if(name){
        name = name.toLowerCase();
        let index = que.findIndex(item =>{
            return item === name;
        })

        if(index == -1){
            que.push(name);
        }

    }

    res.json(que);
    
});

app.listen(app.get('port'), function() {
    console.log('SOS server running', app.get('port'));
});
