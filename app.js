window.addEventListener('load', () => {
  let location = document.querySelector('.location');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureUnitSection = document.querySelector('.unit');
  let iconInput = document.querySelector('.temp-icon');
  let shortCast = document.querySelector('.forecast');
  let timeName = document.querySelector('.name');
  //get users location
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const api = `https://api.weather.gov/points/${lat},${long}`;

    //fetch api
    const callAPI = async url => {
      await fetch(url)
        .then(res => {
          return res.json();
        })
        .then(data => {
          //   console.log(data.properties);
          const forecastAPI = data.properties.forecast;

          const { city, state } = data.properties.relativeLocation.properties;
          location.textContent = `${city}, ${state}`;

          //fetch forecast
          fetch(forecastAPI)
            .then(forecastRes => {
              return forecastRes.json();
            })
            .then(forecastData => {
              // console.log(forecastData);
              const today = forecastData.properties.periods[0];
              const {
                temperature,
                temperatureUnit,
                name,
                shortForecast,
                icon,
              } = forecastData.properties.periods[0];

              temperatureSection.textContent = temperature;
              temperatureUnitSection.textContent = temperatureUnit;

              iconInput.src = icon;

              shortCast.textContent = shortForecast;

              timeName.textContent = name;
            });
        });
    };

    callAPI(api);
  });
});
