const wordUlDefword = document.getElementById('defDef');
const definitionCheckbox = document.getElementById('definition');
const wordUlSynword = document.getElementById('synDef');
const synwordCheckbox = document.getElementById('synonym');
const wordButton = document.getElementById ('wordButton');
const input = document.getElementById('wordInput');

const fetchDefword = function() { fetch(`https://wordsapiv1.p.rapidapi.com/words/${input.value}/definitions`, {"method": "GET","headers": {"x-rapidapi-host": "wordsapiv1.p.rapidapi.com","x-rapidapi-key": "113c2e81edmshb008c962ffc8e87p1d1cfbjsnd24e95b4e333"
	}
})

.then(res => {
    if (!res.ok) {
      throw Error(res.status)
    }
    res.json().then(data => {d = data.definitions[0].definition;
    return d;
    }).then(data => {printDefinition(d);})})
}

const printDefinition = function () {
    removeDefword();

const div = document.createElement('div');
    div.innerHTML = d;
    wordUlDefword.appendChild(div);
};

const removeDefword = function () {
    wordUlDefword.innerHTML= "";
};

const fetchSynword = function() { fetch(`https://wordsapiv1.p.rapidapi.com/words/${input.value}/synonyms`, {"method": "GET", "headers": {"x-rapidapi-host": "wordsapiv1.p.rapidapi.com","x-rapidapi-key": "113c2e81edmshb008c962ffc8e87p1d1cfbjsnd24e95b4e333"
	}
})

.then((res) => {
    if (!res.ok) {
      throw Error(res.status)
    }
    res.json().then(data => {arrData = data.synonyms;
    return data.synonyms;
    }).then(data => {printSynwords(arrData);})})
};

const printSynwords = function () {
    removeSynwords();  
    for (let word of arrData) {
        const li = document.createElement('li');
        li.innerHTML = word;
        wordUlSynword.appendChild(li);
    }}; 

const removeSynwords = function () {
    wordUlSynword.innerHTML= "";
};

wordButton.addEventListener('click' , function() {
    if (synwordCheckbox.checked & definitionCheckbox.checked) {
        fetchSynword();
        fetchDefword();
    } else { 
    if (definitionCheckbox.checked) {
      fetchDefword();
      removeSynword();
    } else {
    if (synwordCheckbox.checked) {
        fetchSynword();
        removeDefword();
    } else {
      alert('Please select your options below');
      }
  } }
});

var inputText = document.getElementById("wordInput");
   inputText.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
         event.preventDefault();
         document.getElementById("wordButton").click();
      }
   });