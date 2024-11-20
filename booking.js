async function fetchBookingTimes(date, id) {
   try {
      const response = await fetch(
         "https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=" +
            date +
            "&challenge=" +
            id
      );
      if (!response.ok) {
         throw new Error(`HTTP ERROR! Status: ${response.status}`);
      }
      const data = await response.json();
      data.slots.forEach((slot) => {
         console.log(slot);
      });
      return data;
   } catch (error) {
      console.error(error);
   }
}

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
        <di class="container-top">
            <p><b>Book room "Title of room"(step 1)</b></p>
            <p>What date would you like to come?</p>
            <p>Date</p>
            <input type="date" class="date-input" min="${currentDate}">
        </di>
        <di class="container-bottom">
            <button id="btn-search-time"> search available time</button>
        </di>
   `;
   document.body.appendChild(section);
   console.log(`Id: ${ID} Participants: ${minParticipants}-${maxParticipants}`);

   const searchTimesBtn = document.querySelector("#btn-search-time");

   searchTimesBtn.addEventListener("click", () => {
      const chosenDate = document.querySelector(".date-input").value;
      if (chosenDate === "") {
         return;
      } else {
         console.log(chosenDate);
         document.querySelector(".book-page-one").remove();

         openBookingPageTwo(ID, minParticipants, maxParticipants, chosenDate);
      }
   });
}

// Function to generate booking page two
async function openBookingPageTwo(ID, minParticipants, maxParticipants, date) {
   const section = document.createElement("section");
   section.className = "booking-step-two";
   section.innerHTML = `
       <p>Work is ongoing..!!<p>
       <p>book room title of room step 2</p>


       <form>

           <label for="input-name">Name</label>
           <input id="input-name" name="input-name" type="text" required />

           <label for="input-email">Email</label>
           <input id="input-email" name="input-email" type="email" required />

           <label for="what-time">What time?</label>
           <select id="what-time" name="time" required>
           </select>
           <label for="participants-count">How many participants:</label>
           <select id="participants-count" name="options">
           </select>

           <input type="submit" class="submit-booking" value="Submit booking" />
       </form>

   `;
   document.body.appendChild(section);
   const submitBtn = document.querySelector(".submit-booking");

   /* Generate options for participants */
   for (let i = minParticipants; i <= maxParticipants; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", `${i}`);
      option.innerText = i + " participants";
      document.querySelector("#participants-count").prepend(option);
   }

   const data = await fetchBookingTimes(date, ID);

   /* Generate options for times */
   for (let i = 0; i < data.slots.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", data.slots[i]);
      option.innerText = data.slots[i];
      document.querySelector("#what-time").prepend(option);
   }

   console.log(data.slots);

   submitBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const form = document.querySelector("form");

      if (!form.checkValidity()) {
         form.reportValidity();
         return;
      }

      const bookedName = document.querySelector("#input-name").value;
      const bookedEmail = document.querySelector("#input-email").value;
      const chosenTime = document.querySelector("#what-time").value;
      const chosenParticipants = parseInt(
         document.querySelector("#participants-count").value
      );

      const url =
         "https://lernia-sjj-assignments.vercel.app/api/booking/reservations";

      const data = {
         challenge: ID,
         name: bookedName,
         email: bookedEmail,
         date: date,
         time: chosenTime,
         participants: chosenParticipants,
      };

      fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
         })
         .then((result) => console.log("Success: ", result))
         .catch((error) => console.error("Error: ", error));

      document.querySelector(".booking-step-two").remove();
   });
}
