/* This section is for hamburger menu on phone */

/* const hamburgerButton = document.querySelector(".hamburger-button");
const headerNav = document.querySelector(".header-nav");
const container = document.querySelector(".container");

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
  const aTexts = ["Play online", "Play on-site", "The story", "Contact"]; */
/*   const aTextsHref = ["#", "#", "#", "#"]; */
/* 
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
}); */

/* Functions for buttons */

const onsiteButtons = document.querySelectorAll(".button-wrapper__onsite");
const onlineButtons = document.querySelectorAll(".button-wrapper__online");
const onsiteButtonsArray = Array.from(onsiteButtons);
const onlineButtonsArray = Array.from(onlineButtons);

/* Eventlisteners for singe buttons */

function seeAllChallenges () {
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

async function fetchOnlineOrOnsite() {
  try {
    const response = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const onlineArray = [];
    const onsiteArray = [];

    for (let key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((challenge) => {
          if (challenge.type === "online") {
            onlineArray.push(challenge);
          } else {
            onsiteArray.push(challenge);
          }
        });
      }
    }
    console.log("Online data:", onlineArray);
    console.log("Onsite data:", onsiteArray);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchOnlineOrOnsite();

async function fetchSortAndFindTopIds() {
  try {
    // Fetch data from the API
    const response = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges"
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();

    // Loop through each array in the object and sort by rating
    for (let key in data) {
      if (Array.isArray(data[key])) {
        // Sort each array in descending order of rating
        data[key].sort((a, b) => b.rating - a.rating);
      }
    }
    changeCards(data);
    console.log("Sorted Data:", data); // Log the sorted data
    return { sortedData: data }; // Return sorted data and top-rated IDs
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function
fetchSortAndFindTopIds();

function changeCards(data) {
  cardOneTitle.innerText = data.challenges[0].title;
  cardTwoTitle.innerText = data.challenges[1].title;
  cardThreeTitle.innerText = data.challenges[2].title;

  cardOneText.innerText = data.challenges[0].description;
  cardTwoText.innerText = data.challenges[1].description;
  cardThreeText.innerText = data.challenges[2].description;

  cardParticipantsOne.innerText = `${data.challenges[0].minParticipants} -  ${data.challenges[0].maxParticipants}`;
  cardParticipantsTwo.innerText = `${data.challenges[1].minParticipants} -  ${data.challenges[1].maxParticipants}`;
  cardParticipantsThree.innerText = `${data.challenges[2].minParticipants} -  ${data.challenges[2].maxParticipants}`;

  cardButtonOne.innerText =
    data.challenges[0].type === "online"
      ? "Take challenge online"
      : "Book this room";
  cardButtonTwo.innerText =
    data.challenges[1].type === "online"
      ? "Take challenge online"
      : "Book this room";
  cardButtonThree.innerText =
    data.challenges[2].type === "online"
      ? "Take challenge online"
      : "Book this room";

  cardImageOne.src = data.challenges[0].image;
  cardImageTwo.src = data.challenges[1].image;
  cardImageThree.src = data.challenges[2].image;

  const starContainers = Array.from(
    document.querySelectorAll(".card-container__star-container")
  );

  for (let i = 0; i < starContainers.length; i++) {
    const ratingVar = data.challenges[i].rating;
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


// const allChallengesButton = document.querySelector(".play-info-container__button");
// allChallengesButton.addEventListener("click", () => {
//   window.location.href = "./challenges.html";
// });
