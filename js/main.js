 /*----- constants -----*/

 const COLORS = {
  '0': 'white',
  '1': 'red',
  '2': 'blue',
  '3': 'yellow',
  '4': 'green',
  '5': 'black',
  '6': 'grey'
 };

 const PEGS = {
  '0': 'white',
  '1': 'maroon', //correct color but not correct position
  '2': 'black'   // correct color AND correct position
 }



  /*----- state variables -----*/
let board; //will be an array of 12 row arrays w 4 cells
let rndCode; // randomized winning code
let turn; // turn # so game knows which row on board to render
let winner; // is playerChoice === rndCode?
let playerGuess;



  /*----- cached elements  -----*/
const messageEl = document.querySelector('h3');
const playAgainBtn = document.getElementById('play-again');

  /*----- event listeners -----*/


  /*----- functions -----*/
init()
  //Initialize all state, then call render()
function init() {
  // to visualize the board's mapping to the DOM
  //bottom to top, left to right. 
  board = [  
    [0,0,0,0], //row 0
    [0,0,0,0], //row 1
    [0,0,0,0], //row 2
    [0,0,0,0], //row 3
    [0,0,0,0], //row 4
    [0,0,0,0], //row 5
    [0,0,0,0], //row 6
    [0,0,0,0], //row 7
    [0,0,0,0], //row 8
    [0,0,0,0], //row 9
    [0,0,0,0], //row 10
    [0,0,0,0], //row 11
  ];

  pegs = [  
    [0,0,0,0], //row 0
    [0,0,0,0], //row 1
    [0,0,0,0], //row 2
    [0,0,0,0], //row 3
    [0,0,0,0], //row 4
    [0,0,0,0], //row 5
    [0,0,0,0], //row 6
    [0,0,0,0], //row 7
    [0,0,0,0], //row 8
    [0,0,0,0], //row 9
    [0,0,0,0], //row 10
    [0,0,0,0], //row 11
  ];

   rndCode = getRndCode
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

