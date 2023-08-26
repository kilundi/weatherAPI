const mainContainer = document.createElement("div");
mainContainer.setAttribute("class", "container-fluid mt-4");
document.body.appendChild(mainContainer);

const wrapperContainer = document.createElement("div");
wrapperContainer.setAttribute("class", "wrapperContainer innerContainer");
mainContainer.appendChild(wrapperContainer);

const inputContainer = document.createElement("div");
inputContainer.setAttribute("class", "inputContainer innerContainer");
wrapperContainer.appendChild(inputContainer);

const input = document.createElement("input");
input.setAttribute("class", "input innerContainer");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Enter City Name...");
input.addEventListener("keyup", (event) => {});
inputContainer.appendChild(input);

const searchBtn = document.createElement("button");
searchBtn.setAttribute("class", "btn btn-primary searchBtn innerContainer");
searchBtn.innerHTML = ` Search <i class="fa-solid fa-magnifying-glass fa-beat-fade fa-sm"></i>`;
inputContainer.appendChild(searchBtn);
searchBtn.addEventListener("click", async () => {
  try {
    // openweathermap website
    const apiKey = "e8a6581a1cb32127d23b2ec3c22162a5";
    const cityName = input.value;
    console.log(cityName);
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    console.log(apiurl);
    // fetching data from the API and storing it in a variable called response
    const response = async () => {
      const res = await fetch(apiurl);
      const data = await res.json();
      console.log(data);
    };
    response();

    const innerDiv1 = document.createElement("div");
    innerDiv1.setAttribute("class", "innerDiv1 innerContainer");
    wrapperContainer.appendChild(innerDiv1);

    const innerDiv2 = document.createElement("div");
    innerDiv2.setAttribute("class", "innerDiv2 innerContainer");
    wrapperContainer.appendChild(innerDiv2);

    const weatherIcon = document.createElement("img");
    // weatherIcon.setAttribute("src", `${data.icon}`);
    weatherIcon.setAttribute("alt", "Weather Icon");
    innerDiv1.appendChild(weatherIcon);
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
});
