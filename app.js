window.addEventListener('load', () => {
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

          //fetch forecast
          fetch(forecastAPI)
            .then(forecastRes => {
              return forecastRes.json();
            })
            .then(forecastData => {
              // console.log(forecastData);
              const today = forecastData.properties.periods[0];
              console.log(today);
            });
        });
    };

    callAPI(api);
  });
});
