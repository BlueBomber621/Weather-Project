const locationLabelOne = document.querySelector("#locationLabel");
const locationLabelTwo = document.querySelector("#locationLabel2");
const descLabel = document.querySelector("#currentDesc");
const weatherLabel = document.querySelector("#currentWeather");
const tempLabel = document.querySelector("#currentTemp");
const feelsLabel = document.querySelector("#currentFeels");
const humidLabel = document.querySelector("#currentHumidity");
const windchillLabel = document.querySelector("#currentWindchill");
const windspeedLabel = document.querySelector("#currentWindspeed");
const weatherImg = document.querySelector("#currentWeatherImg");
const yearLabel = document.querySelector("#yearLabel");
const dateLabel = document.querySelector("#updateLabel");

const apiKey = `6889d54772037a7b65e98163b54881be`;
const apiKey2 = `44fbae7e93b44a6ba1d285d09d6e44da`;
const lat = 68;
const lon = 42;
const url = `https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=${apiKey}`;
const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=tooele&units=imperial&appid=${apiKey}`;
const url3 = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey2}`;

const year = new Date().getFullYear().toLocaleString();
const date = new Date().toLocaleDateString();

yearLabel.innerHTML = year;
dateLabel.innerHTML = date;

let windchill;

fetch(url)
  .then((response) => response.json())
  .then((jsObject) => {
    const dataM = jsObject.main;
    const dataW = jsObject.weather[0];
    const dataN = jsObject.wind;
    locationLabelOne.innerHTML = jsObject.name;
    descLabel.innerHTML = dataW.description;
    weatherLabel.innerHTML = dataW.main;
    tempLabel.innerHTML = dataM.temp;
    feelsLabel.innerHTML = dataM.feels_like;
    humidLabel.innerHTML = dataM.humidity;
    if (dataM.temp >= 50 || dataN.speed <= 3) {
      windchillLabel.innerHTML = "Undefined";
    } else {
      windchill =
        35.74 +
        0.6215 * dataM.temp -
        35.75 * Math.pow(dataN.speed, 0.16) +
        0.4275 * dataM.temp * Math.pow(dataN.speed, 0.16);
      windchill = windchill.toFixed(2);
      windchillLabel.innerHTML = windchill;
    }
    windspeedLabel.innerHTML = dataN.speed;
    if (dataW.main == "Clear" || dataW.main == "Sunny") {
      weatherImg.src = "/Weather-Project/sunny.png";
    } else if (dataW.main == "Clouds") {
      weatherImg.src = "/Weather-Project/cloudy.png";
    } else if (dataW.main == "Rain") {
      weatherImg.src = "/Weather-Project/rainy.png";
    } else if (dataW.main == "Snow") {
      weatherImg.src = "/Weather-Project/snowy.png";
    } else if (dataW.main == "Thunder" || dataW.main == "Lightning") {
      weatherImg.src = "/Weather-Project/thunder.png";
    }
  });

fetch(url2)
  .then((response) => response.json())
  .then((jsObject) => {
    const data = jsObject;
    locationLabelTwo.innerHTML = data.city.name;
    const dayData = data.list;
    for (let i = 0; i < dayData.length / 8; i++) {
      const element = dayData[i * 8];
      let spot = i + 1;
      let spotLabel = `dayTemp${spot}`;
      let imgLabel = `dayImg${spot}`;
      document.getElementById(spotLabel).innerHTML = element.main.temp;
      if (
        element.weather[0].main == "Clear" ||
        element.weather[0].main == "Sunny"
      ) {
        document.getElementById(imgLabel).src = "/Weather-Project/sunny.png";
      } else if (element.weather[0].main == "Clouds") {
        document.getElementById(imgLabel).src = "/Weather-Project/cloudy.png";
      } else if (element.weather[0].main == "Rain") {
        document.getElementById(imgLabel).src = "/Weather-Project/rainy.png";
      } else if (element.weather[0].main == "Snow") {
        document.getElementById(imgLabel).src = "/Weather-Project/snowy.png";
      } else if (
        element.weather[0].main == "Thunder" ||
        element.weather[0].main == "Lightning"
      ) {
        document.getElementById(imgLabel).src = "/Weather-Project/thunder.png";
      }
    }
  });

fetch(url3)
  .then((response) => response.json())
  .then((jsObject) => {
    const mainImg = document.getElementById("header-img");
    const mainDesc = document.getElementById("header-description");
    const mainElement = jsObject.articles[0];

    if (!mainElement.description == "") {
      mainDesc.querySelector("a").innerText = mainElement.description;
    } else {
      mainDesc.querySelector("a").innerText = "No Article Description.";
    }
    if (mainElement.urlToImage == null) {
    } else {
      mainImg.src = mainElement.urlToImage;
    }
    if (mainElement.url == null) {
    } else {
      mainDesc.querySelector("a").href = mainElement.url;
    }

    for (let i = 0; i <= 3; i++) {
      const element = jsObject.articles[i + 1];
      let spot = i + 1;
      let spotLabel = `article-${spot}-header`;
      let spotDesc = `article-${spot}-description`;
      let spotImg = `article-img-${spot}`;
      document.getElementById(spotLabel).innerText = element.title;
      document.getElementById(spotLabel).href = element.url;
      if (!element.description == "") {
        document.getElementById(spotDesc).innerText = element.description;
      } else {
        document.getElementById(spotDesc).innerText = "No Article Description.";
      }
      if (element.urlToImage == null) {
      } else {
        document.getElementById(spotImg).src = element.urlToImage;
      }
    }
    console.log(jsObject);
  });
