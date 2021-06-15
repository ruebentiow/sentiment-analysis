///////////////////////////////////////express app///////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
console.log("Express App starting")

const port = process.env.PORT || 3000;
app.listen(port, listening())
function listening(){
    console.log(`App available on http://localhost:${port}`);
}

app.use(express.static('website'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

//use cors
app.use(cors())
////////////////////////////////////////////////////////////////////////////////////////////////
//ReadFile
var fs = require('fs')
const { readFile, readFileSync, fstat } = require('fs');
var data1 = fs.readFileSync('base.json'); 
var newWords = JSON.parse(data1);         

var data = fs.readFileSync('additional.json'); 
var additional = JSON.parse(data);                  


var afinndata = fs.readFileSync('afinn165.json');
var afinn = JSON.parse(afinndata);
///////////////////////////////////////////API GET/////////////////////////////////////////////////////
app.get('/', (request, response) => {
    readFile('./home.html', 'utf8', (err, html) => {
        if(err){
            response.status(500).send('sorry, out of order');
        }
        response.send(html);
    });

});

app.get('/test', (request, response) => {
    readFile('./website/index.html', 'utf8', (err, html) => {
        if(err){
            response.status(500).send('sorry, out of order');
        }
        response.send(html);
    });

});

//API GET
app.get('/api/alldata', (req, res) => {
    //res.header("Content-Type",'application/json')
    //res.send(JSON.stringify(foo, null, 4));
    res.send(newWords);
});

//API GET 2
app.get('/api/:word/:num', addWord);
function addWord(request, response){
    var data = request.params;
    var num = data.num
    var reply = ""
    for (var i=0; i<num;i++){
        reply+="I love " + data.word+ "s too </br>"
    }
    response.send(reply)
}

//API GET 3
console.log(additional)
app.get('/api/all', getAll);
function getAll(request, response){
    var data = {
        additional: additional,
        afinn: afinn
    }
    response.send(data)
}


app.get('/api/add/:word/:num', addWord);
function addWord(request, response){
    var data = request.params;
    var word = data.word;
    var num = Number(data.num);
    var reply;
    if (!num){
        reply = {
            msg: "Num is required."
        }
        response.send(reply)
    }else{   
        additional[word] = num; // dictionary style of declaration\
        var data = JSON.stringify(additional, null, 2); //stringify is inverse of parse
        fs.writeFile('additional.json', data, finished);
        function finished(err){
            if (err) return err;
            console.log('all set');
            reply = {
                word: word,
                num: num,
                status: "success",
                msg: "Thank you for your word."
            }
            response.send(reply)
        }

    }
}

//API GET 4
app.get('/search/:word/', searchWord);
function searchWord(request, response){
    var word = request.params.word
    var reply;
    if (additional[word]){
        reply={
            status:"Found",
            word: word,
            num: additional[word]
        }
    }else{
        reply={
            status:"Not Found",
            word: word
        }
    }
    response.send(reply)
}


///////////////////////////////////////////API POST /////////////////////////////////////////////////////
app.post('/api/analyze', analyzeThis);
function analyzeThis(request, response){
    console.log(request.body);
    var txt = request.body.text;
    var words = txt.split(/\W+/);
    var totalScore=0;
    var wordlist = [];
    for(var i =0; i < words.length; i++){
        var word = words[i].toLowerCase();
        var score = 0;
        if(additional.hasOwnProperty(word)){
            score = Number(additional[word]);
            wordlist.push(' '+ word+ ': ' + score);
        }else if(afinn.hasOwnProperty(word)){
            score = Number(afinn[word]);
            wordlist.push(' '+ word+ ': ' + score);
        }
        totalScore+= score        
    }

    var comp = totalScore / words.length;

    var reply={
        score: totalScore,
        comparative: comp,
        wordlist: wordlist,
        msg: "Thank you",
    }
    response.send(reply)
}


//API POST
app.post('/api/create/name/:firstname', (req, res) => {
    var creation = (req.body)
    console.log(req.body)
    console.log(req.params)
    //var tmp = JSON.stringify(req.params)
    //var co = JSON.parse(tmp)
    //console.log(JSON.parse(tmp))
    //var ok = '['+co+']'
    //console.log(ok)
    //console.log(req.body)
    //var json = JSON.parse(creation)
    //co.users.push('search result: ' + tmp)
    //fs.writeFileSync("base.json", JSON.stringify(creation))
    res.send("POST REQUEST TO CREATE A USER")
});

///////////////////////////////////////////API PUT /////////////////////////////////////////////////////
//API PUT
app.put('/api/create/user/name', (req,res) =>{
    res.send("PUT REQUEST FOR UPDATING A USER")
});

///////////////////////////////////////////API DELETE /////////////////////////////////////////////////////
//API DELETE
app.delete('/api/delete/user/name',  (req, res) => {
    res.send("DELETE REQUEST FOR DELETING A USER")
  });

///////////////////////////////////////////MONGO DB /////////////////////////////////////////////////////
//mongo "mongodb://adminuser:admin1234@hostname/database"

//mongo db trial

//Creating a database
/*const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    console.log("DB created");
    db.close()
})
*/
//////////////////////////////////////////OLD CODE//////////////////////////////////////////////////////
/*
console.log('hello world');

process.on('exit', function(){
    // do something
})

const { EventEmitter }  = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('lunch', () => {
    console.log('yum');
})

eventEmitter.emit('lunch')
eventEmitter.emit('lunch')

const { readFile, readFileSync, fstat } = require('fs');

const txt = readFileSync('./hello.txt', 'utf8');

console.log(txt);

console.log('next message');

readFile('./hello.txt', 'utf8', (err, txt) => {
    console.log(txt)
})

console.log('another message');


async function hello(){
    const file = await readfile('./hello.txt', 'utf8');
}

// my module
const myModule = require('./my-module');

console.log(myModule);

process.on('exit', function(){
    // do something
})
*/

/*
const { readFile } = require('fs').promises;
    
app.get('/', async (request, response) => {
    readFile('./home.html', 'utf8', (err, html) => {
        if(err){
            response.status(500).send('sorry, out of order');
        }
        response.send(await readFile('./home.html', 'utf8'));
    });

});
*/

