// TO DOs - make markers disappear when game ends. 
// Replace "_correct" h3 with hidden secret code.
// Figure out a place for a 'reference' for pegs? How does the player know what they mean?

/*----- constants -----*/

 const COLORS = ['red', 'blue', 'yellow','green', 'black', 'grey']

 const PEGS = ['grey', 'black'];



  /*----- state variables -----*/
let board;            //Represents the row where the player will make their guess.
let secretCode;       // randomized winning code
let turn;             // turn # so game knows which row (array) on the board to modify and render
let winner; 
let colorChoice;      // variable for choosing color picker
let correctColor;     
let correctPosition;




  /*----- cached elements  -----*/
const messageEl = document.querySelector('h3');
const playAgainBtn = document.getElementById('play-again');
const markerEls = [...document.querySelectorAll('#markers > div')];
const submitBtn = document.getElementById("submit")

  /*----- event listeners -----*/
document.getElementById('picker').addEventListener('click', handlePick);
document.getElementById('markers').addEventListener('click', handleSelect);
document.getElementById('submit').addEventListener('click', handleSubmit);
document.getElementById('play-again').addEventListener('click', init);

  /*----- functions -----*/
init()
  //Initialize all state, then call render()
function init() { 
  board = [null, null, null, null]
  pegs = [];
  colorChoice = 'red';
  secretCode = getSecretCode();
  turn = 0;
  winner = null;
  render();
  
}

//visualize all state in the DOM
function render() {
  renderColors();
  renderMessage();

  //Hide/show UI elements ( play again button...also pegs? Seperate for pegs?
  renderControls();

}


function renderColors() {
  board.forEach(function (color, idx) {
    if(color) {
      document.getElementById(`r${turn}c${idx}`).style.backgroundColor= `${color}`;
    }
  })
  pegs.forEach(function (color, idx) {
    if(color) {
      document.getElementById(`p${turn}c${idx}`).style.backgroundColor= `${color}`;
    }
  })
}


function renderMessage() {
  if(turn > 9) {
    messageEl.innerText = "Sorry, you've run out of guesses!";
  } else if (winner === 'winner') {
    messageEl.innerText = "Congratulations! You chose the right mushrooms!"
  } else {
    // Message saying # of black pegs in row + # of black pegs in row. 
    // Will need to do a forEach loop that counts how many 1's, then 2's
    // In the specfic row's peg array? Yeeeeeah this is now an ICEBOX
    // messageEl.innerHTML = `<span style="color: maroon"></span> : Right color<br>
    // <span style="color: black"></span> : Right position & color`;
  }
}

function renderControls() {
//Play Again button only visible when game ends 
playAgainBtn.style.visibility = (turn > 9 || winner === 'winner') ? 'visible': 'hidden';
// Submit button disappears when game ends
submitBtn.style.visibility = (turn > 9 || winner === 'winner') ? 'hidden': 'visible';
//Need to hide markers here as well

}



// Player clicks a color, 
function handlePick(evt) {
  colorChoice = evt.target.id;
}

function handleSelect(evt) {
  board[parseInt(evt.target.id)] = colorChoice;
  render();
}



function handleSubmit(evt) {
  if(board.includes(null)) return;
  feedback();
  winner = checkWinner();
  render();
  updateForNextTurn();
}


function feedback() {
  let tempArr = board.map(color => color)
  let tempCode = secretCode.map(color => color)
  tempArr.forEach(function(color, idx) {
    if(color === tempCode[idx]) {
      pegs.push('black');
      tempArr[idx] = 7;
      tempCode[idx] = 0;
    }
  })
  tempArr.forEach(function(color, idx) {
    if(tempCode.includes(color)) {
      pegs.push('grey')
      tempArr[idx] = 7
      let colorIdx = tempCode.indexOf(color)
      tempCode[colorIdx] = 0
    }
  })
  
}


function checkWinner() {
  if (pegs.every(color => color === 'black') && (pegs.length === 4)) return "winner";
  return null;

}

function updateForNextTurn() {
  board = board.map((cell) => null);
  pegs = [];
  turn = turn + 1;
}



function getSecretCode() {
  let codeArr = [];
  for (let i=0; i < 4; i++) {
    codeArr.push(COLORS[Math.floor(Math.random()*COLORS.length)])
  }
  return codeArr;
}







