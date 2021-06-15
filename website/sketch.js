/////////////////////////////////////////Client/////////////////////////////////////////////

function setup() {
  createCanvas(450, 450);
  console.log('running');

  var button = select("#submit");
  button.mousePressed(submitWord);
  function submitWord(){
    var word = select('#word').value();
    var num = select('#num').value();
    console.log(word, num)
    loadJSON('/api/add/' + word +'/'+ num, finished);
  }

  function finished(data){
    console.log(data);
  }

  var buttonA = select('#analyze');
  buttonA.mousePressed(analyzeThis);

  function analyzeThis(){
    var txt = select("#textinput").value();
    var data = {
      text: txt,
    }
    httpPost('/api/analyze/', 'json', data, dataPosted, postErr);

    function dataPosted(result){
      console.log(result);
    }

    function postErr(err){
      console.log(err);
    }
  }
}
/////////////////////////////////////////////convert to JSON/////////////////////////////////////////////
/*
var table;
var afinn={};

function preload(){
  table = loadTable('./AFINN-en-165.txt', 'tsv'); //add a file extension, tab sepearated file
}

function setup(){
  noCanvas();
  console.log(table);
  for(var i = 0; table.getRowCount(); i++){
    var row = table.getRow(i);
    var word = row.get(0);
    var num  = row.get(1);
    afinn[word] = num;
    console.log(word, num)
  }
  console.log(afinn);
}
*/

/*

function preload(){
  afinn=loadJSON('./afinn165.json');
}
*/