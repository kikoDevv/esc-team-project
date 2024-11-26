async function getLabelList(data) {
  const labelTags = new Set();

  data.challenges.forEach((challenge) => {
    challenge.labels.forEach((label) => {
      labelTags.add(label);
    });
  });

  const labelArray = [...labelTags];

  /*   console.log("Tjenare Johannes", [...labelArray]); */
  generateLabels([...labelArray]);
}

async function generateLabels(labels) {
  console.log("From generateLabels function", labels);
}
