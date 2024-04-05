let heartCount = 3;




// on lond page load this portion will shuffle the option array boxes
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

  shuffleArray(images)

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

  afterLoadThePage()
}

window.addEventListener("load", loadImages);

/*==========================================================================*/
// timer code 

// function startTimer() {
//   let seconds = 0;
//   setInterval(() => {
//     seconds++;
//     const minutes = Math.floor(seconds / 60);
//     const formattedSeconds = seconds % 60;
//     const timeDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
//     document.querySelector('.container.bg-success span').textContent = timeDisplay;
//   }, 1000);
// }

// window.addEventListener('load', startTimer);

/* =========================================================================== */


function updateHeartCount() {
  document.querySelector('.second img[alt="heart"] + span').textContent = heartCount;
}

function handleWrongMatch() {
  heartCount--;
  updateHeartCount();
  if (heartCount === 0) {
    const modal = new bootstrap.Modal(document.getElementById('modalId'));
    modal.show();
    const retryButton = document.getElementById('retryButton');
    retryButton.addEventListener('click', () => {
      heartCount = 3;
      updateHeartCount();
    });
  }
}



window.addEventListener('load', () => {
  startTimer();
  updateHeartCount();
});










/* =========================================================================== */
function afterLoadThePage(){
  let hoverSound = new Audio();
  let dragBoolean = false

  


const dragOption = document.querySelectorAll('.steps')
dragOption.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
  const step = e.target.dataset.step;
  e.dataTransfer.setData('step', step);
}


function dragEnd() {
  console.log('hhllo dragend')
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
  console.log("hllo i am here :", e.target.dataset.step)
  if (this.dataset.step === step) {
    const img = document.createElement('img');
    const imagePath = 'img/number-' + e.target.dataset.step + '.png'
    img.src = imagePath;
    img.style.width = "100%"; 
    img.style.height = "100%";
    this.appendChild(img);
    this.style.backgroundColor = imagePath;
    this.style.borderColor = 'black'; 

    dragBoolean = true;

    hoverSound.src = 'sounds/pass.wav';
    hoverSound.play();


     // Blur the box after successful drop
    const matchingBox = document.querySelector(`.steps[data-step="${step}"]`);
    console.log("matchig box :",matchingBox)
    if (matchingBox) {
      matchingBox.classList.add('blurred');
    }
    console.log("matchinng class after :",matchingBox)
  } else {
    hoverSound.src = 'sounds/fail.mp3';
    hoverSound.play();

    handleWrongMatch();
  }

}

}


