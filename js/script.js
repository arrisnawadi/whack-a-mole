const play = document.querySelector(".play");
const btnAgain = document.querySelector(".again");
const btnExit = document.querySelector(".exit");
const game = document.querySelector(".container");
const papanSkor = document.querySelector(".nilai");
const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const level = document.querySelectorAll(".level");
const scoreBoard = document.querySelector(".tableScore");
const rules = document.querySelector(".rules");
const back = document.querySelector(".back");

let tanahSebelumnya;
let selesai;
let skor;
let minim;
let maxim;
let seconds;
let point;

// when button play clicked
play.addEventListener("click", function () {
  const x = this.parentElement;
  const lvl = this.parentElement.nextElementSibling;
  if (x.style.display === "none") {
    // hide opening content
    x.style.display = "flex";
    // show level game option
    lvl.style.display = "none";
  } else {
    // show opening content
    x.style.display = "none";
    // hide level game option
    lvl.style.display = "flex";
  }
});

// show the game rules
rules.addEventListener("click", function () {
  const parent = this.parentElement.previousElementSibling;
  parent.style.visibility = "visible";
});

// close the game rules
back.addEventListener("click", function () {
  const parent = this.parentElement.parentElement.parentElement.parentElement;
  parent.style.visibility = "hidden";
});

// set the place of mouse
function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

// set time based on level
function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// show up random rats
function munculTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(minim, maxim);
  tRandom.classList.add("muncul");

  setTimeout(() => {
    tRandom.classList.remove("muncul");
    if (!selesai) {
      munculTikus();
    }
  }, wRandom);
}

// level option
level.forEach(element => {
  element.addEventListener("click", levelMain);
});

// run game with selected level
function levelMain() {
  const lvlContainer = this.parentElement.parentElement;
  if (lvlContainer.style.display === "flex") {
    lvlContainer.style.display = "none";
    lvlContainer.nextElementSibling.style.display = "block";

    if (this.value == "easy") {
      minim = 900;
      maxim = 1200;
      seconds = 43000;
      point = 1;
    } else if (this.value == "medium") {
      minim = 500;
      maxim = 750;
      seconds = 28000;
      point = 2;
    } else if (this.value == "hard") {
      minim = 200;
      maxim = 400;
      seconds = 18000;
      point = 4;
    }

    // set score when game starting
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;

    // play game after 3 seconds delay
    setTimeout(() => {
      munculTikus();
    }, 3000)

    // set score when time's up
    setTimeout(() => {
      selesai = true;
      skor;
    }, seconds);

    // display score board
    setTimeout(() => {
      scoreBoard.style.visibility = "visible";
    }, seconds + 3000);
  } else {
    lvlContainer.style.display = "flex";
  }
}

// calculate the value when the mouse is hit
function pukul() {
  skor += point;
  this.parentNode.classList.remove("muncul");
  papanSkor.textContent = skor;
}

// run hit event
tikus.forEach(elem => {
  elem.addEventListener("click", pukul);
});

// counting time
setInterval(() => {
  seconds--;
  if (seconds <= 0) clearInterval(countdown);
}, 1000);

// when button play again has clicked
btnAgain.addEventListener("click", function () {
  const parent = this.parentElement.parentElement.parentElement.parentElement.parentElement;
  if (parent.style.display === "block") {
    this.parentElement.parentElement.parentElement.parentElement.style.visibility = "hidden";
    parent.style.display = "none";
    parent.previousElementSibling.style.display = "flex";
  } else {
    parent.style.display = "block";
  }
})

// when button exit has clicked
btnExit.addEventListener("click", function () {
  const parent = this.parentElement.parentElement.parentElement.parentElement.parentElement;
  if (parent.style.display === "block") {
    this.parentElement.parentElement.parentElement.parentElement.style.visibility = "hidden";
    parent.style.display = "none";
    parent.previousElementSibling.previousElementSibling.style.display = "flex";
  } else {
    parent.style.display === "block"
  }
})