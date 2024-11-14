const hamburgerButton = document.querySelector(".hamburger-button");
const headerNav = document.querySelector(".header-nav");
const container = document.querySelector(".container");

const cardOneTitle = document.querySelector(".card-container__card-one");
const cardTwoTitle = document.querySelector(".card-container__card-two");
const cardThreeTitle = document.querySelector(".card-container__card-three");

const cardOneText = document.querySelector(".card-container__card-text-one");
const cardTwoText = document.querySelector(".card-container__card-text-two");
const cardThreeText = document.querySelector(".card-container__card-text-three");

const cardParticipantsOne = document.querySelector(".card-container__participants-one");
const cardParticipantsTwo = document.querySelector(".card-container__participants-two");
const cardParticipantsThree = document.querySelector(".card-container__participants-three");

const cardButtonOne = document.querySelector(".card-container__button-one");
const cardButtonTwo = document.querySelector(".card-container__button-two");
const cardButtonThree = document.querySelector(".card-container__button-three");

const cardImageOne = document.querySelector(".card-container__img-one");
const cardImageTwo = document.querySelector(".card-container__img-two");
const cardImageThree = document.querySelector(".card-container__img-three");

let challengesSorted = [];

hamburgerButton.addEventListener("click", () => {
  hamburgerButton.style.display = "none";
  const nav = document.createElement("nav");
  const closeNavBtn = document.createElement("button");
  const img = document.createElement("img");
  img.setAttribute("src", "./pictures/nav-button-close.png");
  nav.classList.add("phone-nav");
  closeNavBtn.classList.add("close-nav-btn");
  setTimeout(() => {
    closeNavBtn.classList.add("hidden-to-visible-transition");
  }, 10);
  document.body.prepend(nav);
  nav.appendChild(closeNavBtn);
  closeNavBtn.appendChild(img);

  container.classList.add("opacity-transition");

  const aTexts = ["Play online", "Play on-site", "The story", "Contact"];
  /*   const aTextsHref = ["#", "#", "#", "#"]; */

  for (let i = 0; i < 4; i++) {
    const a = document.createElement("a");
    a.textContent = aTexts[i];
    nav.append(a);
  }

  closeNavBtn.addEventListener("click", () => {
    nav.remove();
    document.querySelector(".container").classList.remove("opacity-transition");
    hamburgerButton.style.display = "inline";
  });
});

async function fetchAPI() {
  try {
    // Fetch data from the API
    const response = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges"
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    challengesSorted = data.challenges.sort((a, b) => b.rating - a.rating);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getTopRanked() {
  await fetchAPI();
  updateCardsTitle();
  updateCardsDescription();
  updateCardsParticipants();
  updateCardsButtonText();
  updateCardsImage();
  updateCardsRating();
}

function updateCardsTitle() {
  cardOneTitle.innerText = challengesSorted[0].title;
  cardTwoTitle.innerText = challengesSorted[1].title;
  cardThreeTitle.innerText = challengesSorted[2].title;
}

function updateCardsDescription() {
  cardOneText.innerText = challengesSorted[0].title;
  cardTwoText.innerText = challengesSorted[1].title;
  cardThreeText.innerText = challengesSorted[2].title;
}

function updateCardsParticipants() {
  cardParticipantsOne.innerText = `${challengesSorted[0].minParticipants} -  ${challengesSorted[0].maxParticipants}`;
  cardParticipantsTwo.innerText = `${challengesSorted[1].minParticipants} -  ${challengesSorted[1].maxParticipants}`;
  cardParticipantsThree.innerText = `${challengesSorted[2].minParticipants} -  ${challengesSorted[2].maxParticipants}`;
}

function updateCardsButtonText() {
  cardButtonOne.innerText = challengesSorted[0].type === "online" ? "Take challenge online" : "Book this room";
  cardButtonTwo.innerText = challengesSorted[1].type === "online" ? "Take challenge online" : "Book this room";
  cardButtonThree.innerText = challengesSorted[2].type === "online" ? "Take challenge online" : "Book this room";
}

function updateCardsImage() {
  cardImageOne.src = challengesSorted[0].image;
  cardImageTwo.src = challengesSorted[1].image;
  cardImageThree.src = challengesSorted[2].image;
}

function updateCardsRating() {
  const starContainers = Array.from(
    document.querySelectorAll(".card-container__star-container")
  );

  for (let i = 0; i < starContainers.length; i++) {
    const ratingVar = challengesSorted[i].rating;
    const createI1 = document.createElement("i");
    const createI2 = document.createElement("i");
    const createI3 = document.createElement("i");
    const createI4 = document.createElement("i");
    const createI5 = document.createElement("i");

    switch (ratingVar) {
      case 0:
        console.log("case 0 was run");
        createI1.classList.add("fa-regular", "fa-star", "red");
        createI2.classList.add("fa-regular", "fa-star", "red");
        createI3.classList.add("fa-regular", "fa-star", "red");
        createI4.classList.add("fa-regular", "fa-star", "red");
        createI5.classList.add("fa-regular", "fa-star", "red");

        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 0.5:
        console.log("case 0.5 was run");
        createI1.classList.add("fa-regular", "fa-star-half-stroke", "red");
        createI2.classList.add("fa-regular", "fa-star", "red");
        createI3.classList.add("fa-regular", "fa-star", "red");
        createI4.classList.add("fa-regular", "fa-star", "red");
        createI5.classList.add("fa-regular", "fa-star", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 1:
        console.log("case 1 was run");
        createI1.classList.add("fa-solid", "fa-star", "red");
        createI2.classList.add("fa-regular", "fa-star", "red");
        createI3.classList.add("fa-regular", "fa-star", "red");
        createI4.classList.add("fa-regular", "fa-star", "red");
        createI5.classList.add("fa-regular", "fa-star", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 1.5:
        console.log("case 1.5 was run");
        createI1.classList.add("fa-solid", "fa-star", "red");
        createI2.classList.add("fa-regular", "fa-star-half-stroke", "red");
        createI3.classList.add("fa-regular", "fa-star", "red");
        createI4.classList.add("fa-regular", "fa-star", "red");
        createI5.classList.add("fa-regular", "fa-star", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 2:
        console.log("case 2 was run");
        createI1.classList.add("fa-solid", "fa-star", "red");
        createI2.classList.add("fa-solid", "fa-star", "red");
        createI3.classList.add("fa-regular", "fa-star", "red");
        createI4.classList.add("fa-regular", "fa-star", "red");
        createI5.classList.add("fa-regular", "fa-star", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 2.5:
        console.log("case 2.5 was run");
        createI1.classList.add("fa-solid", "fa-star", "red");
        createI2.classList.add("fa-solid", "fa-star", "red");
        createI3.classList.add("fa-regular", "fa-star-half-stroke", "red");
        createI4.classList.add("fa-regular", "fa-star", "red");
        createI5.classList.add("fa-regular", "fa-star", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 3:
        console.log("case 3 was run");
        createI1.classList.add("fa-solid", "fa-star", "red");
        createI2.classList.add("fa-solid", "fa-star", "red");
        createI3.classList.add("fa-solid", "fa-star", "red");
        createI4.classList.add("fa-regular", "fa-star", "red");
        createI5.classList.add("fa-regular", "fa-star", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 3.5:
        console.log("case 3.5 was run");
        createI1.classList.add("fa-solid", "fa-star", "red");
        createI2.classList.add("fa-solid", "fa-star", "red");
        createI3.classList.add("fa-solid", "fa-star", "red");
        createI4.classList.add("fa-regular", "fa-star-half-stroke", "red");
        createI5.classList.add("fa-regular", "fa-star", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 4:
        createI1.classList.add("fa-solid", "fa-star", "red");
        createI2.classList.add("fa-solid", "fa-star", "red");
        createI3.classList.add("fa-solid", "fa-star", "red");
        createI4.classList.add("fa-solid", "fa-star", "red");
        createI5.classList.add("fa-regular", "fa-star", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 4.5:
        console.log("case 4.5 was run");
        createI1.classList.add("fa-regular", "fa-star", "red");
        createI1.classList.add("fa-solid", "fa-star", "red");
        createI2.classList.add("fa-solid", "fa-star", "red");
        createI3.classList.add("fa-solid", "fa-star", "red");
        createI4.classList.add("fa-solid", "fa-star", "red");
        createI5.classList.add("fa-regular", "fa-star-half-stroke", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
      case 5:
        console.log("case 5 was run");
        createI1.classList.add("fa-solid", "fa-star", "red");
        createI2.classList.add("fa-solid", "fa-star", "red");
        createI3.classList.add("fa-solid", "fa-star", "red");
        createI4.classList.add("fa-solid", "fa-star", "red");
        createI5.classList.add("fa-solid", "fa-star", "red");
        starContainers[i].prepend(
          createI1,
          createI2,
          createI3,
          createI4,
          createI5
        );
        break;
    }
  }
}

getTopRanked();