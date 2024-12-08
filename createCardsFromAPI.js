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
    console.log("Message from fetchAPI in createCards.js" + data);
    document.querySelector(".loader").remove();
    createCardsFromAPI(data.challenges);
    getLabelList(data);
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
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const icon = document.createElement("i");
    const titleHeading = document.createElement("h3");
    const descriptionText = document.createElement("p");
    const participantsText = document.createElement("small");
    const btnCard = document.createElement("button");

    // Set attributes and text
    img.setAttribute("src", challenge.image || "placeholder.jpg");
    titleHeading.innerText = challenge.title;

    if (challenge.type === "onsite") {
      titleHeading.innerText += " (on-site)";
      icon.classList.add("fa-solid", "fa-house", "icon");
    }
    descriptionText.innerText = challenge.description;
    participantsText.innerText = getParticipants(
      challenge.minParticipants,
      challenge.maxParticipants
    );
    if (challenge.type === "online") {
      participantsText.innerText += " (networked)";
      icon.classList.add("fa-solid", "fa-laptop", "icon");
    }

    // Set button text
    if (challenge.type === "onsite") {
      btnCard.textContent = "Book this room";
      btnCard.classList.add("onsite");
      btnCard.classList.add("book-btn");
    } else {
      btnCard.textContent = "Take challenge online";
      btnCard.classList.add("online");
      btnCard.classList.add("book-btn");
    }

    // Apply styles
    cardDiv.classList.add("api-card-container__card");
    imgContainer.classList.add("img-container");

    imgContainer.appendChild(img);
    if (challenge.type === "onsite" || challenge.type === "online") {
      imgContainer.appendChild(icon);
    }
    cardDiv.appendChild(imgContainer);
    cardDiv.appendChild(titleHeading);

    // Create stars and append them
    const stars = createStars(challenge.rating);
    stars.forEach((star) => cardDiv.appendChild(star));
    cardDiv.append(participantsText);
    cardDiv.append(descriptionText);
    cardDiv.append(btnCard);

    // Append card to the container
    cardContainer.append(cardDiv);

    btnCard.addEventListener("click", () => {
      openBookingPageOne(
        challenge.id,
        challenge.minParticipants,
        challenge.maxParticipants
      );
    });
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
