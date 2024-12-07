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

         //---Check if the stars are filled before applying filters
         const starsFilledCountLeft = document.querySelectorAll(".stars-container-left i.fa-solid").length;
         const starsFilledCountRight = document.querySelectorAll(".stars-container-right i.fa-solid").length;

         if (starsFilledCountLeft > 0 && starsFilledCountRight > 0) {
            if (filterKey === "from" && starsFilledCountLeft <= starsFilledCountRight) {
               applyFilters();
            } else if (filterKey === "to" && starsFilledCountRight >= starsFilledCountLeft) {
               applyFilters();
            }
         }
      });
   });
}

document.addEventListener("DOMContentLoaded", function () {
   const starsLeft = document.querySelectorAll(".stars-container-left i");
   const starsRight = document.querySelectorAll(".stars-container-right i");

   handleStarClick(starsLeft, "from");
   handleStarClick(starsRight, "to");

   // Parse query string and set initial filter values
   const urlParams = new URLSearchParams(window.location.search);
   const minRating = parseInt(urlParams.get("minRating"), 10);
   const maxRating = parseInt(urlParams.get("maxRating"), 10);

   if (!isNaN(minRating)) {
      setStars(starsLeft, minRating);
      filterState.ratings.from = minRating;
   }

   if (!isNaN(maxRating)) {
      setStars(starsRight, maxRating);
      filterState.ratings.to = maxRating;
   }

   applyFilters();
});

function setStars(stars, count) {
   stars.forEach((star, index) => {
      if (index < count) {
         star.classList.add("fa-solid");
         star.classList.remove("fa-star-half-stroke");
      } else {
         star.classList.remove("fa-solid", "fa-star-half-stroke");
      }
   });
}

function sortByType() {
   const types = [];
   if (includeOnline.checked) types.push("online");
   if (includeOnsite.checked) types.push("onsite");

   filterState.types = types;
   applyFilters();
}

function sortByText() {
   filterState.text = filterInput.value.toLowerCase();
   applyFilters();
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

//---- this Function is to synchronize the number of filled stars
function synchronizeStars(clickCountLeft, lastClickedIndexLeft) {
   const starsFilledCountRight = document.querySelectorAll(
      ".stars-container-right i.fa-solid"
   ).length;
   const starsFilledCountLeft = document.querySelectorAll(
      ".stars-container-left i.fa-solid"
   ).length;
   const starsHalfFiled = document.querySelectorAll(
      ".stars-container-right i.fa-star-half-stroke"
   ).length;
   const leftStars = document.querySelectorAll(".stars-container-left i");

   leftStars.forEach((star, index) => {
      if (index < starsFilledCountRight) {
         star.classList.remove("fa-star-half-stroke");
      } else {
         star.classList.remove("fa-solid");
         star.classList.remove("fa-star-half-stroke");
      }
   });

   //---Apply half-filled class to the last filled star if there are any half-filled stars
   if (starsFilledCountRight === starsFilledCountLeft && starsHalfFiled > 0) {
      if (starsFilledCountRight > 0) {
         leftStars[starsFilledCountRight - 1].classList.remove("fa-solid");
      }
      leftStars[starsFilledCountRight - 1].classList.add("fa-star-half-stroke");
      clickCountLeft = 0;
      lastClickedIndexLeft = -1; 
   }
}

// ----------------------------stars left------------------------------------------
const starsLeft = document.querySelectorAll(".stars-container-left i");
let lastClickedIndexLeft = -1;
let clickCountLeft = 0;

starsLeft.forEach((star, index) => {
   star.addEventListener("click", function () {
      const starsFilledCountRight = document.querySelectorAll(
         ".stars-container-right i.fa-solid"
      ).length;

      if (index < starsFilledCountRight) {
         if (lastClickedIndexLeft === index) {
            clickCountLeft++;
            if (clickCountLeft === 2) {
               star.classList.toggle("fa-star-half-stroke");
            } else if (clickCountLeft === 3) {
               star.classList.remove("fa-solid", "fa-star-half-stroke");
               star.classList.add("fa-regular");
               clickCountLeft = 0; // Reset the click count
               lastClickedIndexLeft = -1; // Reset the last clicked index
            }
         } else {
            starsLeft.forEach((s, i) => {
               if (i <= index) {
                  s.classList.remove("fa-star-half-stroke");
                  s.classList.add("fa-solid");
               } else {
                  s.classList.remove("fa-star-half-stroke");
                  s.classList.remove("fa-solid");
               }
            });
            lastClickedIndexLeft = index; // Update the last clicked index
            clickCountLeft = 1; // Reset the click count to 1 for the new star
         }
      }
   });
});
//---------------------------------starsRight--------------------------------------------------
// Event listener for right side stars
const starsRight = document.querySelectorAll(".stars-container-right i");
let lastClickedIndexx = -1;
let clickCountx = 0;

starsRight.forEach((starx, index) => {
   starx.addEventListener("click", function () {
      if (lastClickedIndexx === index) {
         clickCountx++;
         if (clickCountx === 2) {
            // starx.classList.toggle("fa-star-half-stroke");
         } else if (clickCountx === 3) {
            starx.classList.remove("fa-solid", "fa-star-half-stroke");
            starx.classList.add("fa-regular");
            clickCountx = 0; // Reset the click count
            lastClickedIndexx = -1; // Reset the last clicked index
         }
      } else {
         starsRight.forEach((s, i) => {
            if (i <= index) {
               s.classList.add("fa-solid");
               s.classList.remove("fa-star-half-stroke");
            } else {
               s.classList.remove("fa-solid", "fa-star-half-stroke");
            }
         });
         lastClickedIndexx = index; 
         clickCountx = 1;
      }
      synchronizeStars(clickCountLeft, lastClickedIndexLeft);
   });
});
