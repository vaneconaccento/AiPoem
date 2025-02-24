//typewriter function
function displayPoem(response) {
  //log the API Response
  console.log("API Response:", response);

  //typewriter
  const poemText = response.answer
    ? response.answer
        .replace(/```html/g, "")
        .replace(/```/g, "")
        .trim()
    : "No poem generated.";
  console.log("Cleaned Poem Text:", poemText);

  if (typeof poemText === "string" && poemText.length > 0) {
    new Typewriter("#poem-text", {
      strings: [poemText], // Pass the cleaned poem as a string in an array
      autoStart: true,
      delay: 50, // Adjust delay for better animation
      cursor: "",
    });
  } else {
    console.error("Poem text is empty or invalid:", poemText);
  }
}
//generate poem
function generatePoem(event) {
  event.preventDefault();

  //api variables and URL
  let apiKey = "d7f1fbcd3e24octa40af721d34315a43";
  let instructions = document.querySelector("#user-input").value;
  let prompt = `generate a french poem about ${instructions}`;
  let context =
    "You are a romantic french poem expert. Please generate a 4 line poem in as an HTML string, separating each line with a </br>, based on the user-input, with no title and an author signature of 'SheCodes AI' insde of a <strong> element at the end of the poem";

  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  //show poem container
  let poemElement = document.querySelector("#poem-text");
  poemElement.classList.remove("hidden");

  //for debugging
  console.log(`Prompt:${prompt}`);
  console.log(`Context:${context}`);
  console.log("generating poem");

  //call api
  axios
    .get(apiURL)
    .then((response) => {
      displayPoem(response.data);
    })
    .catch((error) => {
      console.error("Error generating poem:", error);
      alert("Desolee, il y a un error 😥");
    });
}

//replace current poem text
let poemFormElement = document.querySelector("#poem-generator");
poemFormElement.addEventListener("submit", generatePoem);
