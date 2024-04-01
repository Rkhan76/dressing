let dragBoolean = false
document.querySelectorAll('.steps').forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
  e.dataTransfer.setData('step', e.target.dataset.step); // Using 'step' attribute instead of 'set'
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
  console.log("hllo i am here :",e.target.dataset.step)
  if (this.dataset.step === step) {
      const img = document.createElement('img');
      const imagePath = 'img/number-' + e.target.dataset.step + '.png'
      img.src = imagePath
      img.width = 50;
      img.height = 50;
      this.appendChild(img);
      this.style.backgroundColor = imagePath
      this.style.borderColor = 'black'; 

      dragBoolean = true

      // setTimeout(() => this.classList.add('hide'), 0);
  } else {
      alert("That's not the right color for this slot!");
  }
}

