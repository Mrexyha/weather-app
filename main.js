import conditions from "./conditions.js";

const apiKey = "cc285e1ea4fb402fa4f134026240705";

const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

const removeCard = () => {
  const preCard = document.querySelector(".card");
  if (preCard) preCard.remove();
};

const showError = (erroeMessage) => {
  const html = `<div class="card">${erroeMessage}</div>`;
  header.insertAdjacentHTML("afterend", html);
};

const showCard = ({ name, country, temp, condition, imgPath }) => {
  const html = `<div class="card">
                      <div class="card-city">${name} <span>${country}</span></div>

                      <div class="card-weather">
                          <div class="card-value">${temp}<sup>°c</sup></div>
                          <img class="card-image" src="${imgPath}" alt="Weather">
                      </div>

                      <div class="card-desc">${condition}</div>
                  </div>
                `;

  header.insertAdjacentHTML("afterend", html);
};

async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

form.onsubmit = async function (e) {
  e.preventDefault();

  let city = input.value.trim();

  const data = await getWeather(city);

  if (data.error) {
    removeCard();

    showError(data.error.message);
  } else {
    removeCard();

    const info = conditions.find(
      (obj) => obj.code === data.current.condition.code
    );

    const filePath = "./img/" + (data.current.is_day ? "day" : "night") + "/";
    const fileName = (data.current.is_day ? info.day : info.night) + ".png";

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.is_day
        ? info.languages[32].day_text
        : info.languages[32].night_text,
      imgPath: filePath + fileName,
    };

    showCard(weatherData);
  }
};
