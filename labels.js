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
  }
  console.log("From generateLabels function", labels.length);
}
