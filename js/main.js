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




  /*----- state variables -----*/
let board; //will be an array of 12 row arrays w 4 cells
let rndCode; // randomized winning code
let turn; // turn # so game knows which row on board to render
let winner; // is playerChoice === rndCode?



  /*----- cached elements  -----*/


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
      cellEl.style.backgroundColor = 'purple';
    });

  });
}


function renderPegs() {
  pegs.forEach(function(rowArr, rowIdx) {
    rowArr.forEach(function(pegVal, colIdx) {
      const pegId = `r${rowIdx}peg${colIdx}`;
      const pegEl = document.getElementById(pegId);
      pegEl.style.backgroundColor = 'red';
      console.log(pegEl);
    });
  
  });
  
}





function renderMessage() {

}

function renderControls() {

}




function getRndCode() {

}

