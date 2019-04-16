import memorycards from "./memorycards.js"

var openedcard1 = 0;
var openedcard2 = 0;
var count = 0;
var pair =0;
var message = "Congrats!!!";

shuffleArray(memorycards);

var memorygame = document.getElementById('memorygame');

// Create a section with the class allcards
var allcards = document.createElement('section');
allcards.setAttribute('class', 'allcards');

// Append the allcards section to the memorygame div
memorygame.appendChild(allcards);

//Create a div with the class card for every image in the memorycards array
memorycards.forEach(item => {
  var card = document.createElement('div');
  card.classList.add('card');

  // Set data-name 
  card.dataset.name = item.name;
    
  // Create the front of the card
  var front = document.createElement('div');
  front.classList.add('front');

  // Create the back of the card
  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;
 
  // Append card to allcards, and append front and back to each card  
  allcards.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

 //Shuffle array memorycards
 function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
 }

  //Reset if the flipped cards is'nt a match
  function resetGuesses () {
  openedcard1 = 0;
  openedcard2 = 0;
  count = 0;
      
  let chosen = document.querySelectorAll('.chosen');
  chosen.forEach(card => {
    card.classList.remove('chosen');
  });
};

//When you win the game you'll get a message and the newgame button will become visible
function winner () {
document.getElementById('message').innerHTML = message;
document.getElementById('newgame').style.display = 'block';
}

// Event listener is added to allcards
allcards.addEventListener('click', function (event) {
  let clicked = event.target;

  // Only allow the divs inside allcards to be chosen 
  if (clicked.nodeName === 'SECTION' || 
      clicked.parentNode.classList.contains('chosen')
     ){ return; }
    
    if (count < 2) {
    count++;
        if (count === 1) {
          //First card
          openedcard1 = clicked.parentNode.dataset.name;
          clicked.parentNode.classList.add('chosen');
          clicked.classList.add('chosen');
        } else {
          //Second card
          openedcard2 = clicked.parentNode.dataset.name;
          clicked.parentNode.classList.add('chosen');
          clicked.classList.add('chosen');
        }
        if (openedcard1 && openedcard2 && pair<7) {
          //When you've found a match, run the match function
          if (openedcard1 === openedcard2) {
            pair++;
            setTimeout(match, 900);
            setTimeout(resetGuesses, 900);

          } else {
            setTimeout(resetGuesses, 900);
            }
        }
        //When you've found all the pairs, run the winner function
        if (pair===6){
            setTimeout(winner, 1300);
        } 
    }
 });

// The game will reload when you click the newgame button
 document.getElementById('newgame').addEventListener("click", reload);

function reload() {
  location.reload();
}

// The cards disappear from the game when you get a match
function match () {
  var chosen = document.querySelectorAll('.chosen');
  chosen.forEach(card => {
    card.classList.add('match');
  });
}


    


