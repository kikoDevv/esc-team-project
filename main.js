const hamburgerButton = document.querySelector(".hamburger-button");
const headerNav = document.querySelector(".header-nav");

hamburgerButton.addEventListener("click", () => {
  document.querySelector(".container").style.opacity = "0.5";
  hamburgerButton.style.display = "none";
  const nav = document.createElement("nav");
  const closeNavBtn = document.createElement("button");
  const img = document.createElement("img");
  img.setAttribute("src", "./pictures/nav-button-close.png");
  nav.classList.add("phone-nav");
  closeNavBtn.classList.add("close-nav-btn");
  document.body.prepend(nav);
  nav.appendChild(closeNavBtn);
  closeNavBtn.appendChild(img);

  const aTexts = ["Play online", "Play on-site", "The story", "Contact us"];
  const aTextsHref = ["#", "#", "#", "#"];

  for (let i = 0; i < 4; i++) {
    const a = document.createElement("a");
    a.textContent = aTexts[i];
    nav.append(a);
  }

  closeNavBtn.addEventListener("click", () => {
    nav.remove();
    document.querySelector(".container").style.opacity = "1";
    hamburgerButton.style.display = "inline";
  });
});
