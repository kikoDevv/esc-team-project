/* Fetching challenges from API */

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
    console.log(data);
    createCardsFromAPI(data.challenges);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchAPI();

const cardContainer = document.querySelector(".api-card-container");

function createCardsFromAPI(challenges) {
  const images = [];
  const titles = [];
  const rating = [];
  const descriptions = [];
  const textBtn = [];

  cardContainer.innerHTML = "";

  challenges.forEach((challenge) => {
    if (challenge.image) {
      images.push(challenge.image);
    }
    titles.push(challenge.title);
    rating.push(challenge.rating);
    descriptions.push(challenge.description);
    textBtn.push(challenge.type);
  });

  console.log("Challenges:", challenges);
  console.log("Images:", images);
  console.log("Titles: " + titles);
  console.log("rating: " + rating);
  console.log("Descriptions: " + descriptions);
  console.log("Btn types: " + textBtn);

  for (let i = 0; i < challenges.length; i++) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const stars = createStars(rating[i]);
    const participantsText = document.createElement("small");
    const p = document.createElement("p");
    const btnCard = document.createElement("button");

    p.innerText = descriptions[i];
    h3.innerText = titles[i];
    img.setAttribute("src", images[i]);

    const participants = getParticipants(
      challenges[i].minParticipants,
      challenges[i].maxParticipants
    );
    participantsText.innerText = participants;

    div.classList.add("api-card-container__card");

    cardContainer.append(div);
    div.append(img);
    div.append(h3);
    stars.forEach((star) => div.appendChild(star));
    div.append(participantsText);
    div.append(p);

    if (textBtn[i] === "onsite") {
      div.append(btnCard);
      btnCard.textContent = "Take challenge online";
    } else {
      div.append(btnCard);
      btnCard.textContent = "Book this room";
    }
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
