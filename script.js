let hoverSound = new Audio();

let dragBoolean = false
document.querySelectorAll('.steps').forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
  const data = e.dataTransfer.setData('step', e.target.dataset.step);
  setTimeout(() => this.classList.add('hide'), 0);
}

function dragEnd() {
  if(dragBoolean === false){
    this.classList.remove('hide');
  }
  console.log("dragend")
  dragBoolean = false
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
  } else {
    hoverSound.src = 'sounds/fail.wav';
    console.log(hoverSound)
    hoverSound.play();
    // setTimeout(() => {
    //   alert("That's not the right color for this slot!");
    // }, 1000); // Delay the alert by 100 milliseconds
  }
}




//audio on hover options
let optionImages = document.getElementsByClassName('optionImg');

Array.from(optionImages).forEach(function(element) {
  element.addEventListener('mouseover', function(e) {
    let soundFile = e.currentTarget.querySelector('.steps').getAttribute('data-sound');
    
    if (soundFile) {
      hoverSound.src = soundFile;
      hoverSound.play();
    }
  });

  element.addEventListener('mouseout', function() {
    hoverSound.pause();
    hoverSound.currentTime = 0;
  });
});

