const images = [
  "images/world anxiety_01.png",
  "images/baby_still_01.jpg",
  "images/baby_still_02.jpg",
  "images/baby_still_03.jpg",
  "images/baby_still_04.jpg",
  "images/baby_still_05.jpg",
  "images/baby_still_06.jpg",
  "images/baby_still_07.jpg",
  "images/baby_still_08.jpg",
  "images/baby_still_09.jpg",
  "images/baby_still_10.jpg",
  "images/baby_still_11.jpg",
  "images/baby_still_12.jpg",
  "images/baby_still_13.jpg",
  "images/iluvmyself_01.png",

];

let current = 0;

const slideImage = document.getElementById("slideImage");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");


nextButton.addEventListener("click", () => {

  current++;

  if (current >= images.length) {
    current = 0;
  }

  slideImage.src = images[current];

});


prevButton.addEventListener("click", () => {

  current--;

  if (current < 0) {
    current = images.length - 1;
  }

  slideImage.src = images[current];

});