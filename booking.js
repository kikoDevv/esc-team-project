/* async function fetchData() {
  try {
     const response = await fetch(
        "https://lernia-sjj-assignments.vercel.app/api/booking/available-times"
     );

     if (!response.ok) {
        throw new Error(`HTTP ERROR! Status: ${response.status}`);
     }

     const data = await response.json();
     console.log(data);
     return data;
  } catch (error) {
     console.error(error);
  }
}
fetchData(); */



// Function to generate booking page one
function openBookingPageOne() {
  const section = document.createElement("section");
  section.className = "book-page-one";
  section.innerHTML = `
       <p>This is beta version of the menu!!<p>
       <p>Book room "title of room step one"</p>
       <p>What date would you like to come</p>
       <p>date</p>
       <input type="date" class="date-input">
       <button class="search-btn">Search available times</button>
   `;
  document.body.appendChild(section);
  const searchTimesBtn = document.querySelector(".search-btn");
  searchTimesBtn.addEventListener("click", () => {
     console.log("searchBtn is clicked!!");




     document.querySelector(".book-page-one").remove();
     openBookingPageTwo();
  });
}

// Function to generate booking page two
function openBookingPageTwo() {
  const section = document.createElement("section");
  section.className = "booking-step-two";
  section.innerHTML = `
       <p>Work is ongoing..!!<p>
       <p>book room title of room step 2</p>
       <p>name</p>
       <input class="input-name" type="text">
       <p>E-mail</p>
       <input class="input-email" type="email">
       <p>What time</p>
       <form>
           <label for="start-time">from:</label>
           <input type="time" id="start-time" name="start-time" required>
       
           <label for="end-time">to:</label>
           <input type="time" id="end-time" name="end-time" required>
       </form>
       <form>
           <label for="participants-count">How many participants:</label>
           <select id="participants-count" name="options">
               <option value="1">1 participant</option>
               <option value="2">2 participants</option>
               <option value="3">3 participants</option>
               <option value="4">4 participants</option>
               <option value="5">5 participants</option>
               <option value="6">6 participants</option>
           </select>
       </form>
       <button class="submit-booking">Submit booking</button>
   `;
  document.body.appendChild(section);
  const submitBtn = document.querySelector(".submit-booking");
  submitBtn.addEventListener("click", ()=>{
   document.querySelector(".booking-step-two").remove();
  });
}


bookRoomBtn.addEventListener("click", () => {
  openBookingPageOne();
});
