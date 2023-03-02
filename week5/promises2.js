main();

function main() {
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then((response) => {
      response.json().then((data) => {
        console.log(data.results.map(({ name }) => name));
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function main2() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();
    throw new Error("ruh roh");
    console.log(data.results.map(({ name }) => name));
  } catch (error) {
    throw error;
  }
  console.log("the end");
}
