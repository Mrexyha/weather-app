const apiKey = "cc285e1ea4fb402fa4f134026240705";

//  Elements on page
const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

//Listening sending of form
form.onsubmit = function (e) {
  //Cancel sending form
  e.preventDefault();

  //Taking the value from input, cut all spaces
  let city = input.value.trim();

  //Doing request to server
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      //Check for error
      if (data.error) {
        //Delete previous card
        const preCard = document.querySelector(".card");
        if (preCard) preCard.remove();

        //Display card with error
        const html = `<div class="card">${data.error.message}</div>`;

        //Displaying card on page
        header.insertAdjacentHTML("afterend", html);
      } else {
        //Display given data in card

        //Delete previous card
        const preCard = document.querySelector(".card");
        if (preCard) preCard.remove();

        //Marking for card
        const html = `<div class="card">
                      <div class="card-city">${data.location.name} <span>${data.location.country}</span></div>

                      <div class="card-weather">
                          <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                          <img class="card-image" src="./img/sun/8.png" alt="Weather">
                      </div>

                      <div class="card-desc">${data.current.condition.text}</div>
                  </div>
                `;

        //Displaying card on page
        header.insertAdjacentHTML("afterend", html);
      }
    });
};
