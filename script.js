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
  innerDiv1.setAttribute("class", "innerDiv1 innerContainer");
  wrapperContainer.appendChild(innerDiv1);

  const emptyInputError = document.createElement("div");
  emptyInputError.setAttribute("class", "emptyInputError innerContainer");
  wrapperContainer.appendChild(emptyInputError);

  const innerDiv2 = document.createElement("div");
  innerDiv2.setAttribute("class", "innerDiv2 innerContainer");
  wrapperContainer.appendChild(innerDiv2);

  const weatherIcon = document.createElement("img");
  // weatherIcon.setAttribute("src", `${data.icon}`);

  weatherIcon.setAttribute("alt", "Weather Icon");
  innerDiv1.appendChild(weatherIcon);

  // continue creating new containers
  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>>>> */
  /* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<>>>> */

  const searchBtn = document.createElement("button");
  searchBtn.setAttribute("class", "btn btn-primary searchBtn innerContainer");
  searchBtn.innerHTML = ` Search <i class="fa-solid fa-magnifying-glass fa-beat-fade fa-sm"></i>`;
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

      const selectedCity = input.value;
      if (selectedCity.trim() === "") {
        // Handle the case where no value was entered
        const emptyError = document.createElement("p");
        emptyError.textContent = "Please enter a city name";
        emptyError.setAttribute("class", "emptyInput");
        emptyInputError.appendChild(emptyError);
        console.log("Please enter a city name.");
        return;
      }
      // clean the containers

      innerDiv1.innerHTML = "";
      innerDiv2.innerHTML = "";

      weatherIcon.innerHTML = "";

      // openweathermap website
      const apiKey = "e8a6581a1cb32127d23b2ec3c22162a5";
      let cityName = input.value;
      console.log(cityName);

      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      console.log(apiurl);

      // fetching data from the API and storing it in a variable called response
      const response = async () => {
        const res = await fetch(apiurl);
        console.log(res.status);
        if (res.status === 404) {
          console.log("City not found.");

          const errorElement = document.createElement("p");
          errorElement.setAttribute("class", "error-message");
          errorElement.textContent = `${cityName} is not a city. Enter a valid city name.`;
          emptyInputError.appendChild(errorElement);
          return;
        }
        const data = await res.json();
        console.log(data);
        console.log(data.sys.country);

        console.log(data.name);

        /* <<<<<<<<<<<>display city name start>>>>>>>>>>>>>< */
        const cityName = document.createElement("div");
        cityName.setAttribute("class", "cityName");
        cityName.innerHTML = ` <div id="cityContainer"> <p id="cityLebal">City:</p> <p>${data.name}</p> </div> `;
        innerDiv1.appendChild(cityName);
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

            const country = document.createElement("p");
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

      // displaying the data on the screen
      const element1 = document.createElement("div");
      element1.setAttribute("class", "element1 innerContainer");
      // element1.innerHTML = `<h4>hey</h4>`;
      innerDiv1.appendChild(element1);

      // continue creating new elements
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
