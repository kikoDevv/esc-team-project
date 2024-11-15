/* This section is for hamburger menu on phone */

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
