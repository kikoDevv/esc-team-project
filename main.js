const hamburgerButton = document.querySelector(".hamburger-button");
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

  const aTexts = ["Play online", "Play on-site", "The story", "Contact"];
  /*   const aTextsHref = ["#", "#", "#", "#"]; */

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
});

/* Example codes to reach the API */

/* const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2022-12-12&challenge=3');
const data = await res.json();
data.slots.forEach(slot => {
  console.log(slot)
});



const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/reservations', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      challenge: 12,
      name: "Customer Name",
      email: "name@example.com",
      date: "2022-12-12",
      time: "18:30",
      participants: 4,
  }),
});
const data = await res.json();
console.log(data); */
