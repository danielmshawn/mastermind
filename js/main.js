// What I'm stuck on:

  //How to generate a random code each game
  //How to click and drag. Is it easy? SHould I go do choosing anotherway? Need color choices to = key in COLORS object?
  //How to iterate thtough only a row at a time after player submits choice and then compare + contrast with rndCode and alter correctColor + correctPosition 
  //


/*----- constants -----*/

 const COLORS = ['red', 'blue', 'yellow','green', 'black', 'grey']

 const PEGS = ['maroon', 'black'];



  /*----- state variables -----*/
let board; //will be an array of 12 row arrays w 4 cells
let rndCode; // randomized winning code
let turn; // turn # so game knows which row on board to render
let winner; // is playerChoice === rndCode?
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

  /*----- functions -----*/
init()
  //Initialize all state, then call render()
function init() {
  // to visualize the board's mapping to the DOM
  //bottom to top, left to right. 
  board = [getNewGuess()];

  pegs = [];

  rndCode = getSecretCode();
  turn = 0;
  winner = null;
  render();
  
}

//visualize all state in the DOM
function render() {
  renderBoard();
  renderPegs();
  renderMessage();

  //Hide/show UI elements ( play again button...also pegs? Seperate for pegs?
  renderControls();


}


function renderBoard() {
  //Nested forEach iterating over every cell in each row of the 2d array
  board.forEach(function(rowArr, rowIdx) {
    rowArr.forEach(function(cellVal, colIdx) {
      const cellId = `r${rowIdx}c${colIdx}`;
      const cellEl = document.getElementById(cellId);
      cellEl.style.backgroundColor = COLORS[cellVal];
    });
  });
}


function renderPegs() {
  pegs.forEach(function(rowArr, rowIdx) {
    rowArr.forEach(function(pegVal, colIdx) {
      const pegId = `r${rowIdx}peg${colIdx}`;
      const pegEl = document.getElementById(pegId);
      pegEl.style.backgroundColor = PEGS[pegVal];
    
    });
  
  });
  
}





function renderMessage() {
  if(turn > 11) {
    messageEl.innerText = "Sorry, you've run out of choices!";
  } else if (playerGuess === rndCode) {
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
playAgainBtn.style.visibility = (turn > 11 || playerGuess === rndCode) ? 'visible': 'hidden';
}




function getRndCode() {

}


// Player clicks a color, render is called to add to board
function handlePick(evt) {
  console.log(evt.target.id);
  colorChoice = evt.target.id;
  render();
}

function handleSelect(evt) {
  const idx = parseInt(evt.target.id);
  board[board.length-1][idx] = colorChoice;
  console.log(evt.target.id)
}

function getNewGuess() {
  return [null, null, null, null]
}

function getSecretCode() {
  let codeArr = [];
  for (let i=0; i < 4; i++) {
    codeArr.push(COLORS[Math.floor(Math.random()*COLORS.length)])
  }
  return codeArr;
}