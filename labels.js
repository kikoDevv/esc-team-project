async function getLabelList(data) {
  const labelTags = new Set();

  data.challenges.forEach((challenge) => {
    challenge.labels.forEach((label) => {
      labelTags.add(label);
    });
  });

  const labelArray = [...labelTags];
  generateLabels([...labelArray]);
}

async function generateLabels(labels) {
  for (let i = 0; i < labels.length; i++) {
    const tagsContainer = document.querySelector(".tagsContainer");
    const tagBtn = document.createElement("button");
    tagBtn.innerText = labels[i];
    tagsContainer.append(tagBtn);

    tagBtn.addEventListener("click", () => {
      tagBtn.classList.toggle("filled");

      if (tagBtn.classList.contains("filled")) {
        filterState.labels.push(labels[i]);
        console.log(filterState.labels);
      } else {
        filterState.labels = filterState.labels.filter(
          (label) => label !== labels[i]
        );
        console.log(filterState.labels);
      }
      applyFilters();
    });
  }
  console.log("From generateLabels function", labels.length);
}
