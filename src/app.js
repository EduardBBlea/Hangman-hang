const wordList = ["pony", "pizza", "answer", "animation", "ant", "animal", "ball", "beer", "bees", "balloon", "cheese", "car", "cranberry", "calm", "drink", "darts", "dream", "dragon", "elf", "elephant", "ent", "eggs", "fairy", "floor", "fire", "flies", "frantic", "formula", "greed", "good", "glamorous", "healthy", "haberdashery", "hibernate", "imagine", "iguana", "iron", "igloo", "isolate", "invoice", "joystick", "jongleur", "junk", "jackal", "juice", "jigsaw", "jab", "karma", "kettle", "kite", "kudos", "known", "knot", "legislation", "launderette", "langoustine", "lama", "liver", "labor", "loose", "lip", "log", "magnificence", "mercenary", "motorbike", "memory", "motive", "muck", "monk", "nostrils", "neighbour", "napkin", "nutmeg", "nill", "nags", "oatmeal", "over", "otter", "oil", "orange", "prank", "pram", "perimeter", "plaster", "quitter", "quantic", "quote", "quinoa", "quaker", "quiff", "raddish", "red", "rattle", "render", "romanian", "rats", "remember"]

const letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];

const imgs = ["./assets/img/step0.png","./assets/img/step1.png","./assets/img/step2.png","./assets/img/step3.png","./assets/img/step4.png","./assets/img/step5.png","./assets/img/step6.png"]

let answer = "";
let maxWrong = 6;
let wrongTries = 0;
let guessed = [];
let wordState = null;

const img = document.querySelector("#hangman-Image");
const pickWord = () => {
  answer = wordList[Math.floor(Math.random() * wordList.length)];
}

const letterBox = document.querySelector(".letterbox");

const getButtons = () =>{
letters.forEach((letter) => {
  let letterButton = document.createElement("button");
  letterButton.innerText = letter.toUpperCase();
  letterButton.classList = "btn btn-primary btn-lg";
  letterButton.id = `${letter}`;
  letterBox.appendChild(letterButton);
})
}

const handleGuess = (chosenLetter) => {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.querySelector(`#${chosenLetter}`).setAttribute("disabled", true)

  if (answer.indexOf(chosenLetter) >= 0) {
    hiddenWord();
    checkWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    wrongTries++;
    img.setAttribute("src",imgs[wrongTries]);
    updateWrongTries();
    checkLost();
  }
}

const checkWon =()=>{
  if (answer === wordState) {
    document.querySelector(".letterbox").innerText = "Congrats!!! YOu won!!!";
  }
}

const checkLost = ()=>{
  if (wrongTries === maxWrong) {
    document.querySelector(".letterbox").innerText = "Game lost! :("
    document.querySelector("#word").innerText = `The answer was: ${answer.toUpperCase()}.`
    }
}

letterBox.addEventListener("click", (e) => {
  if (e.target.id) { handleGuess(e.target.id) }
})

const updateWrongTries=()=>{
  document.querySelector("#wrong-tries").innerText = wrongTries;
}



document.querySelector("#max-wrong").innerText = maxWrong;

const hiddenWord = () => {
  wordState = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");
  document.querySelector("#word").innerText = wordState;
}

function restart(){
  wrongTries = 0;
  guessed = [];
  letterBox.innerText = "";
  pickWord();
  hiddenWord();
  updateWrongTries();
  getButtons();
  img.setAttribute("src",imgs[0]);
}
getButtons();
pickWord();
hiddenWord();
