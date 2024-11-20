const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
const currentDate = `${year}-${month}-${day}`;

// Function to generate booking page one
function openBookingPageOne(ID, minParticipants, maxParticipants) {
  const section = document.createElement("section");
  section.className = "book-page-one";
  section.innerHTML = `
       <p>This is beta version of the menu!!<p>
       <p>Book room "title of room step one"</p>
       <p>What date would you like to come</p>
       <p>date</p>
       <input type="date" class="date-input" min="${currentDate}">
       <button class="search-btn">Search available times</button>
   `;
  document.body.appendChild(section);
  console.log(`Id: ${ID} Participants: ${minParticipants}-${maxParticipants}`);

  const searchTimesBtn = document.querySelector(".search-btn");

  searchTimesBtn.addEventListener("click", () => {
    const chosenDate = document.querySelector(".date-input").value;
    if (chosenDate === "") {
      return;
    } else {
      console.log(chosenDate);
      document.querySelector(".book-page-one").remove();

      openBookingPageTwo(ID, minParticipants, maxParticipants);
    }
  });
}

// Function to generate booking page two
function openBookingPageTwo(ID, minParticipants, maxParticipants) {
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
  <!--         <option value="1">1 participant</option>
               <option value="2">2 participants</option>
               <option value="3">3 participants</option>
               <option value="4">4 participants</option>
               <option value="2">5 participants</option>
               <option value="1">6 participants</option>  -->
           </select>
       </form>
       <button class="submit-booking">Submit booking</button>
   `;
  document.body.appendChild(section);
  const submitBtn = document.querySelector(".submit-booking");

  for (let i = minParticipants; i <= maxParticipants; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", `${i}`);
    option.innerText = i + " participants";
    document.querySelector("#participants-count").prepend(option);
  }

  /* max - min + 1 */
  /* 5 - 2 + 1 */

  submitBtn.addEventListener("click", () => {
    const bookedName = document.querySelector(".input-name").value;
    const bookedEmail = document.querySelector(".input-email").value;

    document.querySelector(".booking-step-two").remove();
  });
}

bookRoomBtn.addEventListener("click", () => {
  openBookingPageOne();
});
