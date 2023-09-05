// Create main container
const mainContainer = document.createElement("div");
mainContainer.setAttribute("class", "container-fluid mt-4");
document.body.appendChild(mainContainer);

// Create title container
const titleContainer = document.createElement("h1");
titleContainer.setAttribute("class", "titleContainer innerContainer");
titleContainer.innerHTML = "WEATHER APP";
mainContainer.appendChild(titleContainer);

// Create title container
const searchBy = document.createElement("h3");
searchBy.setAttribute("class", "searchBy innerContainer");
searchBy.innerText = "Search by city name:";
mainContainer.appendChild(searchBy);

// Create wrapper container
const wrapperContainer = document.createElement("div");
wrapperContainer.setAttribute("class", "wrapperContainer innerContainer");
mainContainer.appendChild(wrapperContainer);

// Create input container
const inputContainer = document.createElement("div");
inputContainer.setAttribute("class", "inputContainer innerContainer");
wrapperContainer.appendChild(inputContainer);

// Create city dataset array
const cityDataset = [];

// Function to fetch cities from API
async function getCities() {
  try {
    const response = await fetch("https://api.teleport.org/api/urban_areas/");
    const data = await response.json();
    const cities = data["_links"]["ua:item"];
    const cityNames = cities.map((city) => city["name"]);
    cityDataset.push(...cityNames);
  } catch (error) {
    // console.log.error("An error occurred:", error);
  }
}

// Function to create city input and datalist
function createCityInputAndDatalist() {
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

  const innerDiv1 = document.createElement("div");
  wrapperContainer.appendChild(innerDiv1);

  const emptyInputError = document.createElement("div");

  wrapperContainer.appendChild(emptyInputError);

  const innerDiv2 = document.createElement("div");
  wrapperContainer.appendChild(innerDiv2);

  // // get user Device Location
  // const deviceLocation = document.createElement("button");
  // deviceLocation.innerHTML = "Device Location";
  // deviceLocation.setAttribute("class", "deviceLocation");
  // wrapperContainer.appendChild(deviceLocation);
  // deviceLocation.addEventListener("click", () => {});

  const searchBtn = document.createElement("button");
  searchBtn.setAttribute("class", "btn btn-primary searchBtn innerContainer");
  searchBtn.innerHTML = ` <p>Search</p> <p><i class="fa-solid fa-magnifying-glass fa-beat-fade fa-sm"></i></p> `;
  inputContainer.appendChild(searchBtn);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchBtn.click(); // Trigger the click event of the search button
    }
  });

  searchBtn.addEventListener("click", async () => {
    try {
      emptyInputError.innerHTML = "";
      innerDiv1.setAttribute("class", "innerDiv1 innerContainer");
      innerDiv2.setAttribute("class", "innerDiv2 innerContainer");

      const selectedCity = input.value;
      if (selectedCity.trim() === "") {
        const emptyError = document.createElement("p");
        emptyError.textContent = "Please enter a city name";
        emptyError.setAttribute("class", "emptyInput");
        emptyInputError.appendChild(emptyError);

        innerDiv1.innerHTML = "";
        innerDiv2.innerHTML = "";
        innerDiv1.removeAttribute("class");
        innerDiv2.removeAttribute("class");
        return;
      }

      innerDiv1.innerHTML = "";
      innerDiv2.innerHTML = "";

      const apiKey = "e8a6581a1cb32127d23b2ec3c22162a5";
      let cityName = input.value;

      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

      const response = async () => {
        try {
          const res = await fetch(apiurl);

          if (res.status === 404) {
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

          /* Display Data Start */
          const element1 = document.createElement("div");
          element1.setAttribute("class", "element1 innerContainer");
          element1.innerHTML = `${data.weather[0].main}`;
          innerDiv2.appendChild(element1);

          const imageIcons = document.createElement("img");
          imageIcons.setAttribute("class", "imageIcons innerContainer");
          element1.appendChild(imageIcons);

          const now = new Date();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();
          const period = currentHour >= 12 ? "PM" : "AM";
          const formattedHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
          const formattedMinute =
            currentMinute < 10 ? "0" + currentMinute : currentMinute;
          const time = `${formattedHour}:${formattedMinute} ${period}`;

          let timeOfDay;

          if (currentHour >= 6 && currentHour < 18) {
            timeOfDay = "daytime";

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

          const element9 = document.createElement("div");
          element9.setAttribute("class", "element9 innerContainer");
          element9.innerHTML = `Feels like: ${Math.floor(
            data.main.feels_like
          )}°C`;
          element2.appendChild(element9);

          const cityName1 = document.createElement("div");
          cityName1.setAttribute("class", "cityName1");
          cityName1.innerHTML = ` <div id="cityContainer"> <p id="cityLebal">City:</p> <p>${data.name}</p> </div> `;
          innerDiv1.appendChild(cityName1);

          const countryCode = data.sys.country;

          async function getCountryFullName(code) {
            try {
              const response = await fetch(
                `https://restcountries.com/v2/alpha/${code}`
              );
              const data = await response.json();
              if (response.ok) {
                return data.name;
              } else {
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
              const country = document.createElement("div");
              country.setAttribute("class", "country");
              innerDiv1.appendChild(country);
              if (country) {
                country.innerHTML = ` <p id="countryLebal" >Country:</p> <p id = "countryName">${fullName}</p>`;
              }
            }
          }

          displayCountryFullName();
        } catch (error) {
          console.log(error.message);
        }
      };

      /* fun end */

      response();
      input.value = "";
    } catch (error) {
      console.error("An error occurred:", error);
      return [];
    }
  });
}

// Function to setup the page
async function setupPage() {
  await getCities();
  createCityInputAndDatalist();
}

// Call the setupPage function
setupPage();
