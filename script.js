let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let formid = id("formid"),
time = id("time"),
times = id("times"),
loc=id("loc"),
weeks = id("weeks"),
date = id("date"),
month = id("month"),
year = id("year"),
inp = id("inp"),
search = id("search"),
weatherCardDiv = id("div5"),
feel = id("feel"),
humidity = id("humidity"),
pressure = id("pressure"),
sea = id("sea"),
max=id("max"),
min=id("min"),
rise=id("rise"),
set=id("set"),
guest=id("guest"),
speed=id("speed"),
div19container=id("div19container"),
div21 = id("div21"),
div19cont1imgimg = id("div19cont1imgimg"),
div18container = id("div18container");



function getLocalTime(timeZone) {
  let options = { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  return new Date().toLocaleString('en-US', options);
  }
time.innerText = getLocalTime("Asia/Kolkata");
times.innerText = getLocalTime("Asia/Kolkata")

function localtime(){
  selectElement = document.querySelector('#selects');
  function getLocalTime(timeZone) {
    let options = { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return new Date().toLocaleString('en-US', options);
    }
    time.innerText = getLocalTime(selectElement.value)
}
let weekcal = ["Sunday,", "Monday,", "Tuesday,","Wednesday,", "Thursday,", "Friday,", "Saturday,"]
      weeks.innerText = weekcal[new Date().getDay()]
       date.innerText = new Date().getDate();
      let monthcal = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
      month.innerText = monthcal[new Date().getMonth()];
      year.innerText = new Date().getFullYear();

      

      let weatherdata = [
        {
          gifimg:`<img src="./img/Clouds.gif" alt="">`,
          mainimg:`<img src="./img/cloud.png" alt="">`,
        },
        {
          gifimg:`<img src="./img/heavy.gif" alt="">`,
          mainimg:`<img src="./img/heavy.png" alt="">`,
        },
        {
          gifimg:`<img src="./img/rain.gif" alt="">`,
          mainimg:`<img src="./img/rain.png" alt="">`,
        },
        {
          gifimg:`<img src="./img/Snowing.gif" alt="">`,
          mainimg:`<img src="./img/snow.png" alt="">`,
        },
        {
          gifimg:`<img src="./img/sunny.gif" alt="">`,
          mainimg:`<img src="./img/sunny.png" alt="">`
        }
      ]
      
      


      const Api_key = "9013ed2fbb72a7bfe5c170f5e97457ec" // API Key

      const getWeatherDetails = (cityname,lat,lon) => {
        const WeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Api_key}`;

        fetch(WeatherApiUrl).then(res => res.json()).then(data =>{
         
          console.log(data);
          
          //Sunrise and sunset
         function convertTimestamptoTime(unixTimestamp) {

          // Convert to milliseconds and
          // then create a new Date object
          let dateObj = new Date(unixTimestamp * 1000);
          let utcString = dateObj.toUTCString();
 
           let time = utcString.slice(-11, -4);
    
           return time
        }
        rise.innerText = convertTimestamptoTime(data.city.sunrise);
        set.innerText = convertTimestamptoTime(data.city.sunset);
          div18container.innerHTML = "";
          for(let i=0; i<=7; i++){
            
            div18container.innerHTML += `<h3>${data.list[i].dt_txt}<span><img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt=""> ${(data.list[i].main.temp - 273.15).toFixed(2)} °C</span></h3>`
          }
          

          //filter the forcast to get only one forcast per day
          const uniqueForecastDays = []
          const fiveDaysForecast = data.list.filter(forecast =>{
            const forecastDate = new Date(forecast.dt_txt).getDate();
            
            if(!uniqueForecastDays.includes(forecastDate)){
              console.log(forecastDate)
              
              return uniqueForecastDays.push(forecastDate)
            }
            
          });
          console.log(fiveDaysForecast[0])
          loc.innerText=" " + cityname;
          feel.innerText = fiveDaysForecast[0].main.feels_like;
          humidity.innerText = `${fiveDaysForecast[0].main.humidity}%`;
          pressure.innerText = fiveDaysForecast[0].main.pressure;
          sea.innerText = fiveDaysForecast[0].main.sea_level;
          max.innerText=`${(fiveDaysForecast[0].main.temp_max - 273.15).toFixed(2)} °C`;
          min.innerText=`${(fiveDaysForecast[0].main.temp_min - 273.15).toFixed(2)} °C`;
          guest.innerText=`${fiveDaysForecast[0].wind.gust}M/S`;
          speed.innerText=`${fiveDaysForecast[0].wind.speed}M/S`;


          div19container.innerHTML=`
          <h3>${fiveDaysForecast[0].weather[0].description}</h3>
          <h1>${(fiveDaysForecast[0].main.temp - 273.15).toFixed(2)} °C</h1>
          <h3>${fiveDaysForecast[0].weather[0].main}</h3>
        <h3></h3>`

        switch(fiveDaysForecast[0].weather[0].main){
          case "Rain":
            div21.innerHTML = weatherdata[2].gifimg;
            div19cont1imgimg.innerHTML = weatherdata[2].mainimg;
            break;
          case "Clouds":
            div21.innerHTML = weatherdata[0].gifimg;
            div19cont1imgimg.innerHTML = weatherdata[0].mainimg;
            break;
          case "Thunderstorm":
            div21.innerHTML = weatherdata[1].gifimg;
            div19cont1imgimg.innerHTML = weatherdata[1].mainimg;
            break;
          case "Clear":
            div21.innerHTML=weatherdata[4].gifimg;
            div19cont1imgimg.innerHTML = weatherdata[4].mainimg;
            break;
          case "Snow":
            div21.innerHTML=weatherdata[3].gifimg;
            div19cont1imgimg.innerHTML = weatherdata[3].mainimg;
        }


        inp.value = "";
        weatherCardDiv.innerHTML = "";
          for(let i=1; i<fiveDaysForecast.length; i++){
            weatherCardDiv.innerHTML += `<div class="div5con">
            <h3>${fiveDaysForecast[i].dt_txt.split(" ")[0]}</h3>
            <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}@2x.png" alt="">
            <h3>${fiveDaysForecast[i].weather[0].main}</h3>
            </div>`
              // weatherCardDiv.innerHTML += `<div class="line"></div>`;
          }
        }).catch(()=>{
          alert("An error occured while fetching the weather corrdinates!")
        })
      }
      const getUserinput = () =>{
        const cityname = inp.value.trim();
        if(!cityname) return;
        
        let geoapi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${Api_key}`;


        // get entered city corrdinates (latitude, longitude and name) from the API response
        fetch(geoapi).then(res => res.json()).then(data => {
          if(!data.length) return alert(`No coordinates found for ${cityname}`);

          const {name , lat , lon} = data[0];
          getWeatherDetails(name,lat,lon);
        } ).catch(()=>{
          alert("An error occured while fetching the corrdinates!")
        })
      }

      search.addEventListener("click",getUserinput)
      formID.onsubmit = 
      function(m) {
        m.preventDefault();
        getUserinput();
      }; 
