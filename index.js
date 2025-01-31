let spaces = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset-button");
let heading = document.querySelector("h1");
let turnX = true;
let drawCase = 0;

let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8], 
    [2,4,6]
]
heading.innerText = "Play X!";

//what happens when you click any button
spaces.forEach((space) => {
    space.addEventListener("click" , () => {
        var audio = new Audio("KeyPress.mp3");
        audio.play();

        heading.innerText = "Game in Progress"

        if (turnX) {
            space.innerText = "X";
            turnX = false;
            space.disabled = true;
        }
        else {
            space.innerText = "O";
            turnX = true;
            space.disabled = true;
        }
        drawCase++;
        checkWinner();
    })
})

let disableSpaces = () => {
    for (let space of spaces) {
        space.disabled = true;
    }
}


let checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1 = spaces[pattern[0]].innerText;
        let pos2 = spaces[pattern[1]].innerText;
        let pos3 = spaces[pattern[2]].innerText;
   

        if (pos1 != 0 && pos1 != 0 && pos2 != 0){
            if (pos1 === pos2 && pos2 === pos3) {
                var audio = new Audio("Winner.mp3");
                audio.play();
                heading.innerText = "Winner is " + pos1;
                disableSpaces();
                resetButton.innerText = "New Game"
                resetButton.classList.add("newGame") 
            }
            if (drawCase === 9) {
                var audio = new Audio("Draw.mp3");
                audio.volume = 0.1;
                audio.play();
                heading.innerText = "Draw";
                resetButton.innerText = "New Game"
                resetButton.classList.add("newGame") 
            }
        }
    }  
}

resetButton.addEventListener("click" , () => {

    drawCase = 0;
    let turn = "";
    if (turnX) {
        turn = "X";
    }
    if (!turnX) {
        turn = "O";
    }

    for (let space of spaces) {
        space.innerText = " ";
        space.disabled = false;
    }
    heading.innerText = "Play " + turn + "!"; 
    resetButton.classList.remove("newGame");
    resetButton.innerText = "Reset"
 
})


