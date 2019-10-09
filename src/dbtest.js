const fetch = require("node-fetch");

// fetch("http://localhost:3000/songs").then(
//   data => {
//     console.log(data.json());
//   },
//   err => console.log(err)
// );

fetch("http://localhost:3000/songs", {
  method: "POST",
  body: JSON.stringify({
    title: "yeet",
    keysig: "Bb",
    tempo: 60,
    length: 45,
    songString: "nothing here yet",
    username: "carrot"
  }),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(res => res.json())
  .then(resJSON => {
    console.log("got here");
    console.log(resJSON);
  })
  .catch(error => console.error({ Error: error }));
