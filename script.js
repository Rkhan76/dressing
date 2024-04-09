const playAndPauseButton = document.getElementById('playAndPauseButton')
const finalScore = document.getElementById('winScore')
const gameOverScore = document.getElementById('gameOverScore')
const gameWinModal = document.getElementById('gameWinModal')


let heartCount = 3;
let correctCount = 0;
let finalScoreCount = 0;


const images = [
  { src: "img/number-one.png", sound: "sounds/Blip01.wav", step: "one" },
  { src: "img/number-two.png", sound: "sounds/Blip02.wav", step: "two" },
  { src: "img/number-three.png", sound: "sounds/Blip03.wav", step: "three" },
  { src: "img/number-four.png", sound: "sounds/Blip04.wav", step: "four" },
  { src: "img/number-five.png", sound: "sounds/Blip05.wav", step: "five" },
  { src: "img/number-six.png", sound: "sounds/Blip06.wav", step: "six" },
  { src: "img/number-seven.png", sound: "sounds/sound1.wav", step: "seven" },
  { src: "img/number-eight.png", sound: "sounds/sound1.mp3", step: "eight" },
  { src: "img/number-nine.png", sound: "sounds/sound1.mp3", step: "nine" },
  { src: "img/number-tenth.png", sound: "sounds/sound1.mp3", step: "tenth" },
];

function loadImages() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  shuffleArray(images);

  const container = document.getElementById("color");

  images.forEach((image) => {
    const div = document.createElement("div");
    div.classList.add("col-1", "optionImg");
    const img = document.createElement("img");
    img.classList.add("steps");
    img.setAttribute("data-sound", image.sound);
    img.setAttribute("data-step", image.step);
    img.setAttribute("draggable", "true");
    img.setAttribute("src", image.src);
    img.setAttribute("alt", "");
    div.appendChild(img);
    container.appendChild(div);
  });

  afterLoadThePage();
}

window.addEventListener("load", loadImages);

function updateHeartCount() {
  if (heartCount > 0) {
    const hearts = document.getElementById('hearts')
    const heartIcons = hearts.querySelectorAll('.bi-heart-fill')
    console.log(heartIcons)
    heartIcons[heartCount - 1].classList.remove('bi-heart-fill')
    heartIcons[heartCount - 1].classList.add('bi-heart')
  }
}

function handleWrongMatch() {
  updateHeartCount()
  heartCount--;
  if (heartCount === 0) {
    gameOver()
  }
}




function afterLoadThePage() {
  let hoverSound = new Audio();
  

  const dragOption = document.querySelectorAll('.steps');
  dragOption.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
  });

  function dragStart(e) {
    const step = e.target.dataset.step;
    e.dataTransfer.setData('step', step);
  }

  function dragEnd() {
    console.log('hhllo dragend');
  }

document.querySelectorAll('.slot').forEach(slot => {
    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('dragenter', dragEnter);
    slot.addEventListener('dragleave', dragLeave);
    slot.addEventListener('drop', dragDrop);
  });

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    this.style.borderColor = 'yellow';
  }

  function dragLeave() {
    this.style.borderColor = 'black';
  }

  function dragDrop(e) {
    const step = e.dataTransfer.getData('step');
    if (this.dataset.step === step) {
      const img = document.createElement('img');
      const imagePath = 'img/number-' + e.target.dataset.step + '.png';
      img.src = imagePath;
      img.style.width = "100%";
      img.style.height = "100%";
      this.appendChild(img);
      this.style.backgroundColor = imagePath;
      this.classList.add("border", "border-2", "border-success");
      this.classList.add('non-draggable');

      dragBoolean = true;

      hoverSound.src = 'sounds/pass.wav';
      hoverSound.play();

      const matchingBox = document.querySelector(`.steps[data-step="${step}"]`);
      if (matchingBox) {
        matchingBox.classList.add('blurred');
        matchingBox.classList.add('non-draggable');
      }
      correctCount++
      finalScoreCount += 5
      winCheck()
      
    } else {
      this.classList.add("border", "border-2", "border-danger");
      setTimeout(() => {
        this.classList.remove("border", "border-2", "border-danger");
      }, 1000);
      hoverSound.src = 'sounds/fail.mp3';
      hoverSound.play();

      handleWrongMatch();
    }
  }
}





function playAndPause() {
  console.log(playAndPauseButton)
  console.log(playAndPauseButton.getAttribute('src'))
  if (playAndPauseButton.getAttribute('src') === 'img/playIcon.png') {
    playAndPauseButton.src = 'img/pauseIcon.png';
  } 
}

function gameOver(){
  const gameOverModal = document.getElementById('gameOverModal')
  gameOverModal.classList.add('show', 'd-block')
  gameOverScore.innerHTML = finalScoreCount
}

function restart(){
  window.location.reload();
}

function resume(){
  playAndPauseButton.src = 'img/playIcon.png';
}

function winCheck(){
  console.log("wincheck")
  if (correctCount === 6) {
    console.log("hllo i have win")
    finalScoreCount += ( heartCount * 10)
    gameWinModal.classList.add('show', 'd-block')
    finalScore.innerHTML = finalScoreCount
  }
  return
}