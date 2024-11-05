const hamburgerButton = document.querySelector(".hamburger-button");
const headerNav = document.querySelector(".header-nav");

hamburgerButton.addEventListener("click", () => {
  console.log("Nav Button was pressed");
  const exitNavButton = document.createElement("button");
  const exitNavButtonImg = document.createElement("img");
  headerNav.appendChild(exitNavButton);
  exitNavButton.appendChild(exitNavButtonImg);
  exitNavButtonImg.setAttribute("src", "./pictures/nav-button-close.png");
  exitNavButton.classList.add("exitNavButton");
  headerNav.style.display = "flex";
});

/* const allElements = document.querySelectorAll("*");

allElements.forEach((element) => {
  if (element !== headerNav) {
    element.style.opacity = "0.5";
  }
});
 */
