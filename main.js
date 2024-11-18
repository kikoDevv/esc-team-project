const cardOneTitle = document.querySelector(".card-container__card-one");
const cardTwoTitle = document.querySelector(".card-container__card-two");
const cardThreeTitle = document.querySelector(".card-container__card-three");

const cardOneText = document.querySelector(".card-container__card-text-one");
const cardTwoText = document.querySelector(".card-container__card-text-two");
const cardThreeText = document.querySelector(
  ".card-container__card-text-three"
);

const cardParticipantsOne = document.querySelector(
  ".card-container__participants-one"
);
const cardParticipantsTwo = document.querySelector(
  ".card-container__participants-two"
);
const cardParticipantsThree = document.querySelector(
  ".card-container__participants-three"
);

const cardButtonOne = document.querySelector(".card-container__button-one");
const cardButtonTwo = document.querySelector(".card-container__button-two");
const cardButtonThree = document.querySelector(".card-container__button-three");

const cardImageOne = document.querySelector(".card-container__img-one");
const cardImageTwo = document.querySelector(".card-container__img-two");
const cardImageThree = document.querySelector(".card-container__img-three");

let challengesSorted = [];

/* Functions for buttons */

const onsiteButtons = document.querySelectorAll(".button-wrapper__onsite");
const onlineButtons = document.querySelectorAll(".button-wrapper__online");
const onsiteButtonsArray = Array.from(onsiteButtons);
const onlineButtonsArray = Array.from(onlineButtons);

/* Eventlisteners for singe buttons */

function seeAllChallenges() {
  window.location.href = "./challenges.html";
}

/* Loop eventlisteners for onsite and online buttons */

for (let i = 0; i < onsiteButtonsArray.length; i++) {
  onsiteButtonsArray[i].addEventListener("click", () => {
    window.location.href = "./challenges.html";
    console.log("Onsite pressed");
  });
}

for (let i = 0; i < onlineButtonsArray.length; i++) {
  onlineButtonsArray[i].addEventListener("click", () => {
    window.location.href = "./challenges.html";
    console.log("Online pressed");
  });
}

console.log(onlineButtonsArray);
console.log(onsiteButtonsArray);

/* This section calls and applies from the API */

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
  cardButtonOne.innerText =
    challengesSorted[0].type === "online"
      ? "Take challenge online"
      : "Book this room";
  cardButtonTwo.innerText =
    challengesSorted[1].type === "online"
      ? "Take challenge online"
      : "Book this room";
  cardButtonThree.innerText =
    challengesSorted[2].type === "online"
      ? "Take challenge online"
      : "Book this room";
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

  // Helper function to create and append stars
  function createStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const star = document.createElement("i");

      if (rating >= i + 1) {
        star.classList.add("fa-solid", "fa-star", "red");
      } else if (rating > i && rating < i + 1) {
        star.classList.add("fa-regular", "fa-star-half-stroke", "red");
      } else {
        star.classList.add("fa-regular", "fa-star", "red");
      }

      stars.push(star);
    }
    return stars;
  }

  // Iterate through the star containers and update ratings
  starContainers.forEach((container, index) => {
    const rating = challengesSorted[index].rating;

    // Create the stars based on the rating
    const stars = createStars(rating);

    // Prepend all stars in one go (avoiding multiple prepend calls)
    container.prepend(...stars);
  });
}

getTopRanked();
