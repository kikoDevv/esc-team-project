const includeOnline = document.querySelector("#includeOnline");
const includeOnsite = document.querySelector("#includeOnsite");
const filterInput = document.querySelector(".filterInput");
const btnCloseFilterMenu = document.querySelector(".btnCloseFilter");
const filterSection = document.querySelector(".filterSection");
const filterBtn = document.querySelector("#filterBtn");
//--root--
switchFilterMenu();



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

async function getChallenges() {
   const challengesArray = await fetchData();
   console.log(challengesArray);
}

getChallenges();

async function sortByType() {
   const response = await fetchData();
   const challengesArray = response.challenges;

   const onlineArray = challengesArray.filter(
      (challenge) => challenge.type === "online"
   );
   const onsiteArray = challengesArray.filter(
      (challenge) => challenge.type === "onsite"
   );

   if (
      (includeOnline.checked && includeOnsite.checked) ||
      (!includeOnline.checked && !includeOnsite.checked)
   ) {
      createCardsFromAPI(challengesArray);
      console.log(challengesArray);
   } else {
      if (includeOnline.checked) {
         createCardsFromAPI(onlineArray);
         console.log(onlineArray);
      }

      if (includeOnsite.checked) {
         createCardsFromAPI(onsiteArray);
         console.log(onsiteArray);
      }
   }
}

async function sortByText() {
   const response = await fetchData();
   const challengesArray = response.challenges;

   const input = filterInput.value.toLowerCase();

   const matchedChallenges = challengesArray.filter(
      (challenge) =>
         challenge.title.toLowerCase().includes(input) ||
         challenge.description.toLowerCase().includes(input)
   );

   if (matchedChallenges.length > 0) {
      createCardsFromAPI(matchedChallenges);
   }
}

includeOnline.addEventListener("change", sortByType);
includeOnsite.addEventListener("change", sortByType);
filterInput.addEventListener("keydown", sortByText);






//----funtion to switch the filter menu on and off--
function switchFilterMenu(){
   btnCloseFilterMenu.addEventListener("click", ()=>{
      filterSection.classList.toggle("active");
   });
   filterBtn.addEventListener("click", ()=>{
      console.log("filterBtn clicked!!");
      filterSection.classList.toggle("active");
   });
}
//------
