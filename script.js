let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset');
let newBtn = document.querySelector('#new-btn');
let masContainer = document.querySelector('.msg-container')
let msg = document.querySelector('#msg');
let turnBox = document.querySelector('.turn-indicator')
let turnOBox = document.querySelector('#turn-o')
let turnXBox = document.querySelector('#turn-x')

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    enableBox();
    masContainer.classList.add('hide');
    updateTurnIndicator();
}

const updateTurnIndicator = () => {
    if(turnO){
        turnOBox.classList.add('active');
        turnXBox.classList.remove('active');
    }
    else{
        turnXBox.classList.add('active');
        turnOBox.classList.remove('active');
    }
}

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{

        if(turnO){
            box.innerText = 'O';
            turnO = false;
        }
        else{
            box.innerText = 'X'
            turnO = true;
        }

        box.disabled = true;
        updateTurnIndicator();
        checkWinner();
    })
})


const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
        msg.innerText = `Winner is ${winner}`;
        masContainer.classList.remove('hide');
        disableBox();
        winCelebration();
}

const checkWinner = () => {
    for(let pattern of winPatterns){

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != '' && pos2val != '' && pos3val != ''){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
            }
        }
    }
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


const winCelebration = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
}