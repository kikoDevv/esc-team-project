const includeOnline = document.querySelector("#includeOnline");
const includeOnsite = document.querySelector("#includeOnsite");
const filterInput = document.querySelector(".filterInput");
const btnCloseFilterMenu = document.querySelector("#btnCloseFilter");
const filterSection = document.querySelector(".filterSection");
const filterBtn = document.querySelector("#filter-btn");
//--root--
switchFilterMenu();

const filterState = {
  types: [],
  text: "",
  ratings: {
    from: 0,
    to: 5,
  },
  labels: [],
};

async function fetchData() {
  try {
    const response = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges"
    );

    if (!response.ok) {
      throw new Error(`HTTP ERROR! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function applyFilters() {
  const response = await fetchData();
  const challengesArray = response.challenges;
  let filteredChallenges = challengesArray;

  filteredChallenges = filteredChallenges.filter((challenge) => {
    const rating = challenge.rating;
    return (
      rating >= filterState.ratings.from && rating <= filterState.ratings.to
    );
  });

  if (filterState.text) {
    filteredChallenges = filteredChallenges.filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(filterState.text) ||
        challenge.description.toLowerCase().includes(filterState.text)
    );
  }

  if (filterState.types.length > 0) {
    filteredChallenges = filteredChallenges.filter((challenge) =>
      filterState.types.some((type) => challenge.type.includes(type))
    );
  }

  if (filterState.labels.length > 0) {
    filteredChallenges = filteredChallenges.filter((challenge) =>
      filterState.labels.every((label) => challenge.labels.includes(label))
    );
  }

  createCardsFromAPI(filteredChallenges);
  console.log(filteredChallenges);
}

function handleStarClick(stars, filterKey) {
  let lastClickedIndex = -1;
  let clickCount = 0;

  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      if (lastClickedIndex === index) {
        clickCount++;

        if (clickCount === 2) {
          filterState.ratings[filterKey] = index + 1 - 0.5;
        } else if (clickCount === 3) {
          filterState.ratings[filterKey] = index;
          clickCount = 0;
          lastClickedIndex = -1;
        }
      } else {
        filterState.ratings[filterKey] = index + 1;
        lastClickedIndex = index;
        clickCount = 1;
      }
      applyFilters();
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const starsLeft = document.querySelectorAll(".stars-container-left i");
  const starsRight = document.querySelectorAll(".stars-container-right i");

  handleStarClick(starsLeft, "from");
  handleStarClick(starsRight, "to");
});

function sortByType() {
  const types = [];
  if (includeOnline.checked) types.push("online");
  if (includeOnsite.checked) types.push("onsite");

  filterState.types = types;
  applyFilters();
}

async function sortByText() {
  if (filterInput.value.length >= 3) {
    filterState.text = filterInput.value.toLowerCase();
    applyFilters();
  } else {
    const response = await fetchData();
    const challengesArray = response.challenges;
    createCardsFromAPI(challengesArray);
  }
}

includeOnline.addEventListener("change", sortByType);
includeOnsite.addEventListener("change", sortByType);
filterInput.addEventListener("input", sortByText);

//----funtion to switch the filter menu on and off--
function switchFilterMenu() {
  btnCloseFilterMenu.addEventListener("click", () => {
    filterSection.classList.toggle("active");
    filterBtn.classList.toggle("active");
  });
  filterBtn.addEventListener("click", () => {
    console.log("filterBtn clicked!!");
    filterSection.classList.toggle("active");
    filterBtn.classList.toggle("active");
  });
}
//------

//---------------event listener for the stars----------
document.addEventListener("DOMContentLoaded", function () {
  //for the stars container in left side.
  const stars = document.querySelectorAll(".stars-container-left i");
  let lastClickedIndex = -1;
  let clickCount = 0;
  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      if (lastClickedIndex === index) {
        //count the repeted click on one index.
        clickCount++;
        if (clickCount === 2) {
          //If the same star is clicked twice, switch the class of the stars to half fill.
          star.classList.toggle("fa-star-half-stroke");
        } else if (clickCount === 3) {
          //same stars clicked for 3 times, remove hafl and solid, putt regular stars.
          star.classList.remove("fa-solid", "fa-star-half-stroke");
          star.classList.add("fa-regular");
          clickCount = 0; //Reset the click count
          lastClickedIndex = -1; //Reset the last clicked index
        }
      } else {
        //Fill all stars up to and including the clicked star
        stars.forEach((s, i) => {
          if (i <= index) {
            s.classList.add("fa-solid");
            s.classList.remove("fa-star-half-stroke");
          } else {
            s.classList.remove("fa-solid", "fa-star-half-stroke");
          }
        });
        lastClickedIndex = index; //Update the last clicked index so we know
        clickCount = 1; //Reset the click count to 1 for the new star.
      }
    });
  });
  // same procces but for the stars container in right side.
  const starsx = document.querySelectorAll(".stars-container-right i");
  let lastClickedIndexx = -1;
  let clickCountx = 0;
  starsx.forEach((starx, index) => {
    starx.addEventListener("click", function () {
      if (lastClickedIndexx === index) {
        clickCountx++;
        if (clickCountx === 2) {
          starx.classList.toggle("fa-star-half-stroke");
        } else if (clickCountx === 3) {
          starx.classList.remove("fa-solid", "fa-star-half-stroke");
          starx.classList.add("fa-regular");
          clickCountx = 0; //Reset the click count
          lastClickedIndexx = -1; //Reset the last clicked index
        }
      } else {
        starsx.forEach((s, i) => {
          if (i <= index) {
            s.classList.add("fa-solid");
            s.classList.remove("fa-star-half-stroke");
          } else {
            s.classList.remove("fa-solid", "fa-star-half-stroke");
          }
        });
        lastClickedIndexx = index; //Update the last clicked index so we know
        clickCountx = 1; //Reset the click count to 1 for the new star.
      }
    });
  });
});
