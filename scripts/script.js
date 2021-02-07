$(function() {
  var cityVal;
  var apiKey = "9a6783ed55783b3748c9fdec3dfddb3e";

    $('.button').click(function(){
        cityVal = $(".city-search").val();

        if(cityVal.length > 0){
        //Clear the input box
        $(".city-search").val("");
        $(".not-found").empty();
        getWeather(cityVal);
      }
    })

    function getWeather(city){
      fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" +apiKey)
      .then(function(response){
        if(response.status === 404){
          cityNotFound();
        }
        return response.json();
      })
      .then(function(data){
        displayData(data);
      })
      .catch(function(){
        console.log("Something went wrong.");
      })
    }

    function displayData(data){
      let temperatureInCelsius = (parseFloat(data.main.temp- 273.15)).toFixed(2);
      let description = data.weather[0].main;
      let cityName = data.name;
      let cityCountryId = data.sys.country;
      let icon = data.weather[0].icon;
      let iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

      let textInWeatherBox = document.getElementById('weather-box');
      textInWeatherBox.firstChild.nodeValue = "Weather";

      document.getElementById('city').innerHTML = cityName + ", " + cityCountryId;
      document.getElementById('weather-description').innerHTML = description;
      document.getElementById('temperature').innerHTML = temperatureInCelsius + " &#8451";
      $('#wicon').attr('src', iconurl);
    }

    function cityNotFound(){
      //Clear the textContent in all weather divs
      let textInWeatherBox = document.getElementById('weather-box');
      textInWeatherBox.firstChild.nodeValue = "";
      $('#weather-box div').empty();

      //Add <img> element again to div icon
      let img = document.createElement("img");
      img.id = "wicon";
      img.src = "";
      let icon = document.getElementById("icon");
      icon.appendChild(img);

      let el = document.getElementsByClassName('not-found');
      el[0].innerHTML = "City with that name is not found";
    }
});
