const navButton = document.querySelector(".nav-button");

navButton.addEventListener("click", () => {
  console.log("Nav Button was pressed");
  const headerNav = document.querySelector(".header-nav");
  headerNav.style.display = "flex";
});
