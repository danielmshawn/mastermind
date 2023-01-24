// What I'm stuck on:

  //How to generate a random code each game
  //How to click and drag. Is it easy? SHould I go do choosing anotherway? Need color choices to = key in COLORS object?
  //How to iterate thtough only a row at a time after player submits choice and then compare + contrast with secretCode and alter correctColor + correctPosition 
  //


/*----- constants -----*/

 const COLORS = ['red', 'blue', 'yellow','green', 'black', 'grey']

 const PEGS = ['grey', 'black'];



  /*----- state variables -----*/
let board; //will be an array of 12 row arrays w 4 cells
let secretCode; // randomized winning code
let turn; // turn # so game knows which row on board to render
let winner; // is playerChoice === secretCode?
let playerGuess;
let colorChoice;
let correctColor;
let correctPosition;




  /*----- cached elements  -----*/
const messageEl = document.querySelector('h3');
const playAgainBtn = document.getElementById('play-again');
const markerEls = [...document.querySelectorAll('#markers > div')];

  /*----- event listeners -----*/
document.getElementById('picker').addEventListener('click', handlePick);
document.getElementById('markers').addEventListener('click', handleSelect);
document.getElementById('submit').addEventListener('click', handleSubmit);

  /*----- functions -----*/
init()
  //Initialize all state, then call render()
function init() {
  // to visualize the board's mapping to the DOM
  //bottom to top, left to right. 
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
  if(turn > 11) {
    messageEl.innerText = "Sorry, you've run out of choices!";
  } else if (playerGuess === secretCode) {
    messageEl.innerText = "Congratulations! You chose the right mushrooms!"
  } else {
    //Message saying # of maroon pegs in row + # of black pegs in row. 
    //Will need to do a forEach loop that counts how many 1's, then 2's
    //In the specfic row's peg array?
    messageEl.innerHTML = `<span style="color: maroon"></span> : Right color<br>
    <span style="color: black"></span> : Right position & color`;
  }
}

function renderControls() {
//Play Again button only visible when game ends 
playAgainBtn.style.visibility = (turn > 11 || playerGuess === secretCode) ? 'visible': 'hidden';
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
  console.log(winner, "winner")
  render();
  updateForNextTurn();
}


function getSecretCode() {
  let codeArr = [];
  for (let i=0; i < 4; i++) {
    codeArr.push(COLORS[Math.floor(Math.random()*COLORS.length)])
  }
  return codeArr;
}

function updateForNextTurn() {
  board = board.map((cell) => null);
  pegs = [];
  turn = turn + 1;
  console.log(turn);
}

function checkWinner() {
  if(pegs.every(color => color === 'black')) return "winner"
  return null;
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
  console.log(tempArr);
}