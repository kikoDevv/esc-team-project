/* Fetching challenges from API */

async function fetchAPI() {
  try {
    const response = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    createCardsFromAPI(data.challenges);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchAPI();

const cardContainer = document.querySelector(".api-card-container");

function createCardsFromAPI(challenges) {
  cardContainer.innerHTML = ""; // Clear container

  for (let i = 0; i < challenges.length; i++) {
    const challenge = challenges[i];

    // Create elements
    const cardDiv = document.createElement("div");
    const img = document.createElement("img");
    const titleHeading = document.createElement("h3");
    const descriptionText = document.createElement("p");
    const participantsText = document.createElement("small");
    const btnCard = document.createElement("button");

    // Set attributes and text
    img.setAttribute("src", challenge.image || "placeholder.jpg");
    titleHeading.innerText = challenge.title;
    descriptionText.innerText = challenge.description;
    participantsText.innerText = getParticipants(
      challenge.minParticipants,
      challenge.maxParticipants
    );

    // Set button text
    if (challenge.type === "onsite") {
      btnCard.textContent = "Book this room";
      btnCard.classList.add("onsite");
    } else {
      btnCard.textContent = "Take challenge online";
      btnCard.classList.add("online");
    }

    // Apply styles
    cardDiv.classList.add("api-card-container__card");

    // Append elements to the card
    cardDiv.append(img);
    cardDiv.append(titleHeading);
    // Create stars and append them
    const stars = createStars(challenge.rating);
    stars.forEach((star) => cardDiv.appendChild(star));
    cardDiv.append(participantsText);
    cardDiv.append(descriptionText);
    cardDiv.append(btnCard);

    // Append card to the container
    cardContainer.append(cardDiv);
  }
}

function getParticipants(minParticipants, maxParticipants) {
  return `${minParticipants} - ${maxParticipants} participants`;
}

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
