const mainContainer = document.createElement("div");
mainContainer.setAttribute("class", "container-fluid mt-4");
document.body.appendChild(mainContainer);

const wrapperContainer = document.createElement("div");
wrapperContainer.setAttribute("class", "wrapperContainer innerContainer");
mainContainer.appendChild(wrapperContainer);

const inputContainer = document.createElement("div");
inputContainer.setAttribute("class", "inputContainer innerContainer");
wrapperContainer.appendChild(inputContainer);

/* <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>> */
/* <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>> */
const cityDataset = [];

async function getCities() {
  try {
    const response = await fetch("https://api.teleport.org/api/urban_areas/");
    const data = await response.json();

    const cities = data["_links"]["ua:item"];
    const cityNames = cities.map((city) => city["name"]);

    cityDataset.push(...cityNames);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function createCityInputAndDatalist() {
  //   const container = document.getElementById("container");

  const input = document.createElement("input");
  input.type = "text";
  input.id = "city-input";
  input.placeholder = "Type to select a city";
  input.setAttribute("list", "city-datalist");

  const datalist = document.createElement("datalist");
  datalist.id = "city-datalist";

  cityDataset.forEach((cityName) => {
    const option = document.createElement("option");
    option.value = cityName;
    datalist.appendChild(option);
  });

  inputContainer.appendChild(input);
  inputContainer.appendChild(datalist);
  //   container.appendChild(input);
  //   container.appendChild(datalist);

  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>>>> */
  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>>>> */

  const innerDiv1 = document.createElement("div");

  wrapperContainer.appendChild(innerDiv1);

  const emptyInputError = document.createElement("div");
  emptyInputError.setAttribute("class", "emptyInputError innerContainer");
  wrapperContainer.appendChild(emptyInputError);

  const innerDiv2 = document.createElement("div");
  // innerDiv2.setAttribute("class", "innerDiv2 innerContainer");
  wrapperContainer.appendChild(innerDiv2);

  /*   const weatherIcon = document.createElement("img");
  // weatherIcon.setAttribute("src", `${data.icon}`);

  weatherIcon.setAttribute("alt", "Weather Icon");
  innerDiv1.appendChild(weatherIcon); */

  // continue creating new containers
  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>>>> */
  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>>>> */

  const searchBtn = document.createElement("button");
  searchBtn.setAttribute("class", "btn btn-primary searchBtn innerContainer");
  searchBtn.innerHTML = ` <p>Search</p> <p><i class="fa-solid fa-magnifying-glass fa-beat-fade fa-sm"></i></p> `;
  inputContainer.appendChild(searchBtn);

  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>> */

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchBtn.click(); // Trigger the click event of the search button
    }
  });

  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>> */
  searchBtn.addEventListener("click", async () => {
    try {
      emptyInputError.innerHTML = "";
      innerDiv1.setAttribute("class", "innerDiv1 innerContainer");
      innerDiv2.setAttribute("class", "innerDiv2 innerContainer");

      const selectedCity = input.value;
      if (selectedCity.trim() === "") {
        // Handle the case where no value was entered

        const emptyError = document.createElement("p");
        emptyError.textContent = "Please enter a city name";
        emptyError.setAttribute("class", "emptyInput");
        emptyInputError.appendChild(emptyError);
        console.log("Please enter a city name.");
        innerDiv1.innerHTML = "";
        innerDiv2.innerHTML = "";
        innerDiv1.removeAttribute("class");
        innerDiv2.removeAttribute("class");
        return;
      }
      // clean the containers

      innerDiv1.innerHTML = "";
      innerDiv2.innerHTML = "";

      // weatherIcon.innerHTML = "";

      // openweathermap website
      const apiKey = "e8a6581a1cb32127d23b2ec3c22162a5";
      let cityName = input.value;
      console.log(cityName);

      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
      console.log(apiurl);

      // fetching data from the API and storing it in a variable called response
      const response = async () => {
        const res = await fetch(apiurl);
        // console.log(res.status);
        if (res.status === 404) {
          console.log("City not found.");
          innerDiv1.innerHTML = "";
          innerDiv2.innerHTML = "";
          innerDiv1.removeAttribute("class");
          innerDiv2.removeAttribute("class");

          const errorElement = document.createElement("p");
          errorElement.setAttribute("class", "error-message");
          errorElement.innerHTML = ` <span id="cityError">"${cityName}"</span>   is not a city. Enter a valid city name.`;
          emptyInputError.appendChild(errorElement);

          return;
        }
        const data = await res.json();
        console.log(data);
        console.log(data.sys.country);

        console.log(data.name);
        console.log(data.weather);
        console.log(data.weather[0].main);
        console.log(`id: ${data.weather[0].id}`);
        console.log(`humidity: ${data.main.humidity}%`);
        console.log(`pressure: ${data.main.pressure}`);
        console.log(`temp: ${data.main.temp}`);
        console.log(`wind deg: ${data.wind.deg}`);
        console.log(`wind speed: ${data.wind.speed}km/h.`);
        console.log(`longitude: ${data.coord.lon}`);
        console.log(`latitude: ${data.coord.lat}`);

        /* <<<<<<<<<<<>display Data start>>>>>>>>>>>>>< */
        // displaying the data on the screen
        const element1 = document.createElement("div");
        element1.setAttribute("class", "element1 innerContainer");
        element1.innerHTML = `${data.weather[0].main}`;
        innerDiv2.appendChild(element1);

        const imageIcons = document.createElement("img");
        imageIcons.setAttribute("class", "imageIcons innerContainer");
        // imageIcons.innerHTML = `images/Weather Icons/clear.svg`;
        element1.appendChild(imageIcons);

        /* <<<<<<<<<<<<>>>>>time start>>>>>>><<<<<<<<< */
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const period = currentHour >= 12 ? "PM" : "AM";
        const formattedHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
        const formattedMinute =
          currentMinute < 10 ? "0" + currentMinute : currentMinute;
        const time = `${formattedHour}:${formattedMinute} ${period}`;
        console.log(time);

        let timeOfDay;
        if (currentHour >= 6 && currentHour < 18) {
          timeOfDay = "daytime";
          console.log(`Day time`);

          let id = data.weather[0].id;

          if (id === 800) {
            imageIcons.src = `images/Weather Icons/clear.svg`;
          } else if (id >= 801 && id <= 804) {
            imageIcons.src = `images/Weather Icons/cloud.svg`;
          } else if (id >= 500 && id <= 531) {
            imageIcons.src = `images/Weather Icons/rain.svg`;
          } else if (id >= 300 && id <= 321) {
            imageIcons.src = `images/Weather Icons/drizzle.png`;
          } else if (id >= 200 && id <= 232) {
            imageIcons.src = `images/Weather Icons/storm.svg`;
          } else if (id >= 600 && id <= 622) {
            imageIcons.src = `images/Weather Icons/snow.svg`;
          } else if (id >= 701 && id <= 781) {
            imageIcons.src = `images/Weather Icons/haze.svg`;
          }
        } else {
          timeOfDay = "nighttime";
          console.log(`night time`);
          let id = data.weather[0].id;

          if (id === 800) {
            imageIcons.src = `https://openweathermap.org/img/wn/01n.png`;
          } else if (id >= 801 && id <= 804) {
            imageIcons.src = `https://openweathermap.org/img/wn/02n.png`;
          } else if (id >= 500 && id <= 531) {
            imageIcons.src = `https://openweathermap.org/img/wn/010n.png`;
          } else if (id >= 300 && id <= 321) {
            imageIcons.src = `https://openweathermap.org/img/wn/09n.png`;
          } else if (id >= 200 && id <= 232) {
            imageIcons.src = `https://openweathermap.org/img/wn/11n.png`;
          } else if (id >= 600 && id <= 622) {
            imageIcons.src = `https://openweathermap.org/img/wn/13n.png`;
          } else if (id >= 701 && id <= 781) {
            imageIcons.src = `https://openweathermap.org/img/wn/50d.png`;
          }
        }
        /* <<<<<<<<<<<<>>>>>time end>>>>>>><<<<<<<<< */

        /*   let id = data.weather[0].id;

        if (id === 800) {
          imageIcons.src = `images/Weather Icons/clear.svg`;
        } else if (id >= 801 && id <= 804) {
          imageIcons.src = `images/Weather Icons/cloud.svg`;
        } else if (id >= 500 && id <= 531) {
          imageIcons.src = `images/Weather Icons/rain.svg`;
        } else if (id >= 300 && id <= 321) {
          imageIcons.src = `images/Weather Icons/drizzle.png`;
        } else if (id >= 200 && id <= 232) {
          imageIcons.src = `images/Weather Icons/storm.svg`;
        } else if (id >= 600 && id <= 622) {
          imageIcons.src = `images/Weather Icons/snow.svg`;
        } else if (id >= 701 && id <= 781) {
          imageIcons.src = `images/Weather Icons/haze.svg`;
        } */
        const collectEl = document.createElement("div");
        collectEl.setAttribute("class", "collectEl innerContainer");
        innerDiv2.appendChild(collectEl);

        const element2 = document.createElement("div");
        element2.setAttribute("class", "element2 innerContainer");
        element2.innerHTML = `humidity: ${data.main.humidity}%`;
        collectEl.appendChild(element2);

        const element4 = document.createElement("div");
        element4.setAttribute("class", "element4 innerContainer");
        element4.innerHTML = `temp: ${Math.floor(data.main.temp)}°C`;
        element1.appendChild(element4);

        const element5 = document.createElement("div");
        element5.setAttribute("class", "element5 innerContainer");
        element5.innerHTML = `wind deg: ${data.wind.deg}°`;
        collectEl.appendChild(element5);

        const element6 = document.createElement("div");
        element6.setAttribute("class", "element6 innerContainer");
        element6.innerHTML = `wind speed: ${data.wind.speed} km/h.`;
        element5.appendChild(element6);

        /*  const element7 = document.createElement("div");
        element7.setAttribute("class", "element7 innerContainer");
        element7.innerHTML = `longitude: ${data.coord.lon}`;
        innerDiv2.appendChild(element7);

        const element8 = document.createElement("div");
        element8.setAttribute("class", "element8 innerContainer");
        element8.innerHTML = `latitude: ${data.coord.lat}`;
        innerDiv2.appendChild(element8); */

        const element9 = document.createElement("div");
        element9.setAttribute("class", "element9 innerContainer");
        element9.innerHTML = `Feels like: ${Math.floor(
          data.main.feels_like
        )}°C`;
        element2.appendChild(element9);

        /* const element10 = document.createElement("div");
        element10.setAttribute("class", "element10 innerContainer");
        element10.innerHTML = `<img src="images/Weather Icons/clear.svg" alt="clear" class="images" >
        <img src="images/Weather Icons/cloud.svg" alt="cloud" class="images" >
        <img src="images/Weather Icons/haze.svg" alt="haze" class="images" >
        <img src="images/Weather Icons/rain.svg" alt="rain" class="images" >
        <img src="images/Weather Icons/snow.svg" alt="snow" class="images" >
        <img src="images/Weather Icons/storm.svg" alt="storm" class="images" >
        `;
        innerDiv2.appendChild(element10); */

        // continue creating new elements
        /* <<<<<<<<<<<>display Data end>>>>>>>>>>>>>< */

        /* <<<<<<<<<<<>display city name start>>>>>>>>>>>>>< */
        const cityName1 = document.createElement("div");
        cityName1.setAttribute("class", "cityName1");
        cityName1.innerHTML = ` <div id="cityContainer"> <p id="cityLebal">City:</p> <p>${data.name}</p> </div> `;
        innerDiv1.appendChild(cityName1);
        /* <<<<<<<<<<<>display city name end>>>>>>>>>>>>>< */

        /* <<<<<<<<<>>>>>>>>>>><<<<<<<<<<<<>> */
        /* <<<<<<<<<>>>>>>>>display country name start>>><<<<<<<<<<<<>> */

        const countryCode = data.sys.country; // Replace with the desired alpha-2 country code

        async function getCountryFullName(code) {
          try {
            const response = await fetch(
              `https://restcountries.com/v2/alpha/${code}`
            );
            const data = await response.json();

            if (response.ok) {
              return data.name;
            } else {
              console.log("Country not found.");
              return null;
            }
          } catch (error) {
            console.error("An error occurred:", error);
            return null;
          }
        }

        async function displayCountryFullName() {
          const fullName = await getCountryFullName(countryCode);
          if (fullName) {
            console.log(
              `Full name of country with code ${countryCode}: ${fullName}`
            );

            const country = document.createElement("div");
            country.setAttribute("class", "country");
            innerDiv1.appendChild(country);
            if (country) {
              country.innerHTML = ` <p id="countryLebal" >Country:</p> <p id = "countryName">${fullName}</p>`;
            }
          }
        }

        // Call the function to display the full country name
        displayCountryFullName();

        /* <<<<<<<<<>>>>>>>>display country name end>>><<<<<<<<<<<<>> */
        /* <<<<<<<<<>>>>>>>>>>><<<<<<<<<<<<>> */
      };
      response();

      input.value = "";
    } catch (error) {
      console.error("An error occurred:", error);
      return [];
    }
  });

  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>>>> */
  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>>>> */
}

async function setupPage() {
  await getCities();
  createCityInputAndDatalist();
}

setupPage();

/* <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>> */
/* <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>> */
