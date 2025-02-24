//typewriter function
function displayPoem(response) {
  new Typewriter("#poem-text", {
    strings: [response], // Wrap response in an array
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}
//generate poem
function generatePoem(event) {
  event.preventDefault();

  //api variables and URL
  let apiKey = "d7f1fbcd3e24octa40af721d34315a43";
  let instructions = document.querySelector("#user-input").value;
  let prompt = `generate a french poem about ${instructions}`;
  let context =
    "You are a romantic french poem expert. Please generate a 4 line poem in basic HTML, separating each line with a </br>, based on the user-input, with no title and an author signature of 'SheCodes AI' insde of a <strong> element at the end of the poem";

  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

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
