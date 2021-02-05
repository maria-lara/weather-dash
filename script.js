
$(document).ready(function() {

    // Start with a function to pull info from APIs //

    function weatherLookup (cityname){
    // Current Weather Forecast //

            // Add ajax function to return request //
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=9a79cb0646d7d266d219bbb7f698fdda",
                method: 'GET'
            })
                .then(function (response){
                
                    console.log(response);
            
            // Create each section for the weather elements //
            $("#current-weather").empty();
            //var cwTitle=$("#cw-title");
        
            var cityDisplay = $("<h2>").text(response.name).append("'s Current Weather:");
            var tempDisplay = $("<h4>").text("Temperature (F): " + response.main.temp);
            var humidityDisplay = $("<h4>").text("Humidity (%): " + response.main.humidity);
            var windDisplay = $("<h4>").text("Wind Speed (MPH): " + response.wind.speed);

            // Depending on the type of weather it is, display the icon (rain, wind, etc.) //
            var weatherType = response.weather[0].main;
            // If it is (clear, raining, snowing, etc.).. //
            if (weatherType === "Clear") {
                   // create a variable for the icon image //
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                weatherIcon.attr("style", "height: 80px; width: 80px");
            }
             else if (weatherType === "Rain") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                weatherIcon.attr("style", "height: 80px; width: 80px");
            } 
             else if (weatherType=== "Few Clouds") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                weatherIcon.attr("style", "height: 80px; width: 80px");
            } 
            else if (weatherType=== "Clouds") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                weatherIcon.attr("style", "height: 80px; width: 80px");
            }
             else if (weatherType === "Snow") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                weatherIcon.attr("style", "height: 80px; width: 80px");
            }
             else if (weatherType === "Thunderstorm") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/11d.png");
                weatherIcon.attr("style", "height: 80px; width: 80px");
            }
             else if (weatherType === "Drizzle") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                weatherIcon.attr("style", "height: 80px; width: 80px");
            }



            // Put all of it together on the page to display (try to use .html) //
            let displaySection = $("<section>");
            displaySection.append(cityDisplay , weatherIcon , tempDisplay , humidityDisplay , windDisplay);
            $("#current-weather").html(displaySection);

    // 5 Day Forecast  //

            // Add ajax function to return request //
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=9a79cb0646d7d266d219bbb7f698fdda",
                method: 'GET'
            })
                .then(function (response){
            // Since this isn't just one result like the current day weather, turn it into an array that you can run through //
                var forecastArray = response.list;
                //debugger;
                console.log(forecastArray);
                $("#5-forecast").empty();
                
            // Go through each result and create each section for the weather element like you did for current weather //
                for (var i = 0; i < forecastArray.length; i+=9){
                    //debugger;
                    var day = forecastArray[i].dt_txt;
                    var humid = forecastArray[i].main.humidity;
                    var temp =forecastArray[i].main.temp;
                

                    var dateEl = $("<h5 class='card-title'>").text(day);
                    var humidEl = $("<p class='card-text'>").text("Humidity: " + humid);
                    var tempEl = $("<p class='card-text'>").text("Temp: " + temp);

                     // Depending on the type of weather it is, display the icon (rain, wind, etc.) //
                    var weatherEl = forecastArray[i].weather[0].main;
                     // If it is (clear, raining, snowing, etc.).. //
                    if (weatherEl === "Clear") {
                            // create a variable for the icon image //
                        var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                        forecastIcon.attr("style", "height: 30px; width: 30px");
                    }
                    else if (weatherEl  === "Rain") {
                        var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                        forecastIcon.attr("style", "height: 30px; width: 30px");
                    } 
                    else if (weatherEl === "Few Clouds") {
                        var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                        forecastIcon.attr("style", "height: 30px; width: 30px");
                    } 
                    else if (weatherEl === "Clouds") {
                        var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                        forecastIcon.attr("style", "height: 30px; width: 30px");
                    }
                    else if (weatherEl  === "Snow") {
                        var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                        forecastIcon.attr("style", "height: 30px; width: 30px");
                    }
                    else if (weatherEl  === "Thunderstorm") {
                        var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/11d.png");
                        forecastIcon.attr("style", "height: 30px; width: 30px");
                    }
                    else if (weatherEl  === "Drizzle") {
                        var forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                        forecastIcon.attr("style", "height: 30px; width: 30px");
                    }


                    // Add all of the data and icons to a new page section //
                    let forecastSection = $("<div class='card text-white bg-primary mx-auto mb-10 p-2' style='width: 9rem; height: 11rem;'>");
                    // Put all of your results together //
                    forecastSection.append(dateEl);
                    forecastSection.append(forecastIcon);
                    forecastSection.append(tempEl);
                    forecastSection.append(humidEl);
            
                    
                    $("#5-forecast").append(forecastSection);

                }
            });  

    // UV index //
            // API only calls for latitute and longitude, so find those values first//
    

            var lat = response.coord.lat;
            var lon = response.coord.lon;

                // Add ajax function to return request //
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=9a79cb0646d7d266d219bbb7f698fdda",
                    method: 'GET'
                })
                    .then(function (response) {
                    console.log(response);
                    console.log(lat);
                    console.log(lon);
                    $('#uv-index').empty();
                    // Turn the result into text //
                    var uvDisplay = $("<h4>").text("UV Index: " + response.value);
                    // Add it to the HTML //
                    $('#uv-index').append(uvDisplay);
                    });
                });

    }

    displaySearch();

    // Grab everything that was stored locally and put it on the page //

    function displaySearch(){

        var previousSearch = JSON.parse(localStorage.getItem("cityname"));

        var lastSearch = $("<button class='btn border text-muted mt-1 bg-white' style='width: 20rem; height: 4rem'>").text(previousSearch);
        var searchSection = $("<section>");
    
            searchSection.append(lastSearch)
            $("#city-list").prepend(searchSection);
    }
        $("#city-list").on('click', '.btn', function(event) {
        event.preventDefault();
            console.log($(this).text());
            weatherLookup($(this).text());

        });


     // Add Search function //
     $("#search-button").on("click", (function (event) {
        event.preventDefault(); 

        var searchInput = $("#search-input").val();
        var textInput = $(this).siblings("input").val();
        var list = [];
        list.push(textInput);


        localStorage.setItem('cityname', JSON.stringify(list));

        weatherLookup(searchInput);
        displaySearch();
    })
)})
