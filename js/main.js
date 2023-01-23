 /*----- constants -----*/


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
   rndCode = getRndCode
   turn = 0;
   winner = null;
   render();
  
}

//visualize all state in the DOM
function render() {
renderBoard ();
renderMessage();

//Hide/show UI elements ( play again button...also pegs? Seperate for pegs?
renderControls();


}


renderBoard() {

}

renderMessage() {

}

renderControls () {

}




function getRndCode() {

}

