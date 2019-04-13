var myInput = document.getElementById("psw");
var oneVowel = document.getElementById("oneVowel");
var threeConsecutive = document.getElementById("threeConsecutive");
var twoConsecutive = document.getElementById("twoConsecutive");
var length = document.getElementById("length");
const selectedFile = document.getElementById('myFile');
var results = document.getElementById("results");

selectedFile.addEventListener("change", handleFile, false);

function handleFile(e){
    const file = this.files[0];
    console.log(file.name);
    let text;
    let reader = new FileReader();
    reader.onload = function(e){
        //delete any previously displayed results
        var previousTable = document.getElementById("mytable");
        if(previousTable!=null)
        previousTable.remove();
        text = reader.result;
        console.log(text);
        console.log(typeof text);
        let arr = text.split("\n");
        let isValid = arr.map((data) => validate(data));
        console.log(arr);
        console.log(isValid);
        
        var table = document.createElement('table');
        table.setAttribute('id', 'mytable');
        table.setAttribute('border','1');
        table.setAttribute('width','100%');
        for(var i = 0;i<arr.length;i++){
            var row = table.insertRow(i);
            var text = document.createTextNode('<' + arr[i] + '>');
            var cell = row.insertCell(0);
            cell.setAttribute('align','center')
            cell.appendChild(text);
            text = document.createTextNode((isValid[i]?'is acceptable':'is not acceptable'));
            cell = row.insertCell(1);
            cell.setAttribute('align','center')
            cell.appendChild(text);
        }
        document.body.append(table);        
    }
    reader.readAsText(file); 
}

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
    return validate(myInput.value);
}

function validate(s) {
    console.log(s);
    let bool1, bool2, bool3, bool4;
  // Validate first condition
  const numberOfVowels = Array.from(s)
  .filter(letter => 'aeiouAEIOU'.includes(letter)).length;
  
  if(numberOfVowels >= 1) { 
    oneVowel.classList.remove("invalid");
    oneVowel.classList.add("valid");
    bool1 = true;
  } else {
    oneVowel.classList.remove("valid");
    oneVowel.classList.add("invalid");
    bool1= false;
}

  // Validate second condition
  var consecutiveVowels = /[aieouAEIOU]{3,}/g;
  var consecutiveConsonants = /[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]{3,}/g;
  if(s.match(consecutiveVowels) || s.match(consecutiveConsonants)) { 
    threeConsecutive.classList.remove("valid");
    threeConsecutive.classList.add("invalid");
    bool2 = false;
  } else {
    threeConsecutive.classList.remove("invalid");
    threeConsecutive.classList.add("valid");
    bool2 = true;
  }

 // Validate third condition
 var consecutiveLetters = /([A-Za-z])\1/g;
 var found = s.match(consecutiveLetters);
 console.log(found);
 //var consecutiveE = /[e]{2}/g;
 //var consecutiveO = /[o]{2}/g;
 bool3 = true;
 if(found!=null)
 for(let i = 0; i<found.length;i++){
    if(found[i] != "ee" && found[i] != "oo"){
        bool3 = false;
        break;
    }
}
 if(!bool3) { 
    twoConsecutive.classList.remove("valid");
    twoConsecutive.classList.add("invalid");
 } else {
    twoConsecutive.classList.remove("invalid");
    twoConsecutive.classList.add("valid");
 }

 //It should be atleast 8 characters long
 /*
 if(s.length >= 8){
    length.classList.remove("invalid");
    length.classList.add("valid");
    bool4 = true;
 }
 else{
    length.classList.remove("valid");
    length.classList.add("invalid");
    bool4 = false;
 }*/

 return (bool1 && bool2 && bool3);
}





