$(document).ready(function () {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      let url = "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude;

      $.getJSON(url, function (data) {
        let temp = Math.round(data.main.temp);
        let farengateDegree;
        let celsiumDegree = Math.round(data.main.temp);
        let isCelsium = true;
        let location = data.name;
        let country = data.sys.country;
        let weather = data.weather[0].description;
        let weatherIcon = data.weather[0].icon;
        farengateDegree = Math.round((temp * (9 / 5) + 32));

        if (celsiumDegree>-40 && celsiumDegree <-20){
          $('body').css("background-color", '#0d47a1');
          $('#temp').css("color", '#0d47a1');
        } else if (celsiumDegree>-20 && celsiumDegree<-10) {
          $('body').css("background-color", '#1565c0');
          $('#temp').css("color", '#1565c0');
        } else if (celsiumDegree>-10 && celsiumDegree<=0) {
          $('body').css("background-color", '#1976d2');
          $('#temp').css("color", '#1976d2');
        } else if (celsiumDegree>0 && celsiumDegree <15) {
          $('body').css("background-color", '#1e88e5');
          $('#temp').css("color", '#1e88e5');
        } else if (celsiumDegree>15 && celsiumDegree<25){
          $('body').css("background-color", '#2196f3');
          $('#temp').css("color", '#2196f3');
        } else {
          $('body').css("background-color", '#ffffff');
          $('#temp').css("color", '#ffffff');
        };

        $("#temp").html(celsiumDegree + "°C");
        $("#temp").click(function () {
          if (isCelsium === true) {
            $("#temp").html(farengateDegree + "°F");
            isCelsium = false;
          } else {
            $("#temp").html(celsiumDegree + "°C");
            isCelsium = true;
          }
        });

        $("#city").html("<i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + location + ", " + country);
        $("#icon").append("<img src=" + weatherIcon + '">');
        $("#text").html("<i class='fa fa-sun-o' aria-hidden='true'></i> There is a " + weather + " out the window");

      });

    });
  }


});