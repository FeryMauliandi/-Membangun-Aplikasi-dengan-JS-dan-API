require('dotenv').config()
const getTimeZone = async (cityName) => {
  try {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/timezone.json?q=${cityName}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.API_KEY,
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
const displayCityName = (TimeZone) => {
  const cityNameDiv = document.getElementById("city-description");
  const cityName = TimeZone.location.name;
  const countryName = TimeZone.location.country;
  const element = `<h2>Showing Local Time of ${cityName}, ${countryName}</h2>`;
  cityNameDiv.innerHTML = element;
};

const displayTimeZone = (TimeZone) => {
  const displayTimeZoneDiv = document.getElementById("timezone");
  const timeZone = TimeZone.location.localtime;

  const element = `<div class ="time-container">
     <h2>Local Time</h2>
     <h3>"${timeZone}"</h3>
     </div>`;
  displayTimeZoneDiv.innerHTML = element;
};

const searchCity = async () => {
  const cityName = document.getElementById("city-name").value;
  if (!cityName) {
    return null;
  }
  const TimeZone = await getTimeZone(cityName);

  if (!TimeZone.error) {
    displayCityName(TimeZone);
    displayTimeZone(TimeZone);
  }
};
