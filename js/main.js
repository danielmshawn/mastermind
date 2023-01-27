// TO DOs - 2
// Add hover effect to buttons. Picker and markers as well?
// Do you want secret code divs visible the whole time, and render when game ends?
// Favicon
// Audio?
// Figure out a place for a 'reference' for pegs? How does the player know what they mean?
// Hover effects?
// Change markers. At LEAST flip triangles, but something else maybe. Frogs? lol
// Also...will colors replacing with images...that will make code no longer work, right? Becuase of colors.
// MushroomMind...a "Toad"breaking game

// Create variable alongside turn that will increment along with it.  

/*----- constants -----*/
const COLORS = ['red', 'blue', 'yellow', 'purple', 'orange', 'black']
const PEGS = ['#DEDABD', '#D84028'];



/*----- state variables -----*/
let board;            // Represents the row where the player will make their guess.
let secretCode;       // randomized winning code
let turn;             // turn # so game knows which row (array) on the board to modify and render
let winner;
let colorChoice;      // variable for choosing color picker
let correctColor;
let correctPosition;
let secretCodeDisplayArr;
let guessCounter;



/*----- cached elements  -----*/
const messageEl = document.querySelector('h2');
const playAgainBtn = document.getElementById('play-again');
const markerEls = [...document.querySelectorAll('#markers > div')];
const submitBtn = document.getElementById("submit")
const secretCodeAnswer = document.getElementById('secret-code');



/*----- event listeners -----*/
document.getElementById('picker').addEventListener('click', handlePick);
document.getElementById('markers').addEventListener('click', handleSelect);
document.getElementById('submit').addEventListener('click', handleSubmit);
document.getElementById('play-again').addEventListener('click', handlePlayAgain);



/*----- functions -----*/
init()
//Initialize all state, then call render()
function init() {


  board = [null, null, null, null]
  pegs = [];
  colorChoice = 'red';
  turn = 0;
  guessCounter = 0;
  winner = null;
  secretCode = getSecretCode();
  secretCodeDisplayArr = secretCode.map(color => color);
  render();

}

//visualize all state in the DOM
function render() {
  renderColors();
  //Text changes depending on state
  renderMessage();
  //Hide/show UI elements
  renderControls();
}

function renderColors() {
  board.forEach(function (color, idx) {
    if (color) {
      document.getElementById(`r${turn}c${idx}`).style.backgroundColor = `${color}`;
    }
  })
  pegs.forEach(function (color, idx) {
    if (color) {
      document.getElementById(`p${turn}c${idx}`).style.backgroundColor = `${color}`;
    }
  })
  secretCodeDisplayArr.forEach(function (color, idx) {
    if (color) {
      document.getElementById(`secret${idx}`).style.backgroundColor = `${color}`;
    }
  })

}

function renderMessage() {
  if ((guessCounter > 9) && (winner !== 'winner')) {
    messageEl.innerText = "Sorry, you've run out of guesses!";
  } else if (winner === 'winner') {
    messageEl.innerText = "Congratulations! You chose the right mushrooms!";
  } else {
    messageEl.innerHTML = "A <span style='color:#F5C624'>Toad</span>breaking Game"
  }
}

function renderControls() {
  //Play Again button only visible when game ends 
  playAgainBtn.innerText = (guessCounter > 9 || winner === 'winner') ? 'Play Again!' : 'Reset Game';
  // Submit button disappears when game ends
  submitBtn.style.visibility = (guessCounter > 9 || winner === 'winner') ? 'hidden' : 'visible';
  //Selectors are hidden when game ends
  markerEls.forEach(function (markerEl) {
    markerEl.style.visibility = (guessCounter > 9 || winner === 'winner') ? 'hidden' : 'visible';
  });
  //Only render secret code when game is over
  secretCodeDisplayArr.forEach(function (color, idx) {
    if (guessCounter > 9 || winner === 'winner') {
      document.getElementById(`secret${idx}`).style.backgroundColor = `${color}`;
    } else { 
      document.getElementById(`secret${idx}`).style.backgroundColor = 'transparent';
    }
  })
}

// Player clicks a color, 
function handlePick(evt) {
  colorChoice = evt.target.id;
}
// Selector renders to board
function handleSelect(evt) {
  board[parseInt(evt.target.id)] = colorChoice;
  render();
}

function handleSubmit() {
  if (board.includes(null)) return;
  feedback();
  winner = checkWinner();
  guessCounter = guessCounter + 1;
  render();
  updateForNextTurn();
}

function feedback() {
  let tempArr = board.map(color => color)
  let tempCode = secretCode.map(color => color)
  tempArr.forEach(function (color, idx) {
    if (color === tempCode[idx]) {
      pegs.push('#D84028');
      tempArr[idx] = 7;
      tempCode[idx] = 0;
    }
  })
  tempArr.forEach(function (color, idx) {
    if (tempCode.includes(color)) {
      pegs.push('#DEDABD')
      tempArr[idx] = 7
      let colorIdx = tempCode.indexOf(color)
      tempCode[colorIdx] = 0
    }
  })
}

function checkWinner() {
  if (pegs.every(color => color === '#D84028') && (pegs.length === 4)) return "winner";
  return null;
}

function updateForNextTurn() {
  board = board.map((cell) => null);
  pegs = [];
  turn = turn + 1;

}

function getSecretCode() {
  let codeArr = [];
  for (let i = 0; i < 4; i++) {
    codeArr.push(COLORS[Math.floor(Math.random() * COLORS.length)])
  }
  return codeArr;
};


function handlePlayAgain() {
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 3; j++) {
      document.getElementById(`r${i}c${j}`).style.backgroundColor = 'transparent';
    };
  }
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 3; j++) {
      document.getElementById(`p${i}c${j}`).style.backgroundColor = 'transparent';
    }
  }
  init();
}