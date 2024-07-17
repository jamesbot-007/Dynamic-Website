// Check the script file is connected to the html or not 

/* const SubmitBtn = document.getElementById("SubmitBtn")

const getInfo = (event) =>{
    event.preventDefault();
    alert("hii");
}

SubmitBtn.addEventListener('click', getInfo)
 */

const SubmitBtn = document.getElementById("SubmitBtn");
const InputedCity = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const tetemp_real_valmp = document.getElementById("temp_real_val");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");

const middle_layer = document.querySelector('.middle_layer');




const getCurrentDay = () => {

    var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
  
    let current_time = new Date();
  
      let day = weekday[current_time.getDay()];
      return day;
}
day.innerText = getCurrentDay()




const getCurrentTime = () => {
    var now = new Date();

    var months = ["Jan", "Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]

    var month = now.getMonth() ; // month starts from 0 that's why +1
                                      // month also gives an index no. , but we need a string for that we can use Array.
    var date = now.getDate();

    var m = months[month];

    return `${date} ${m}`
};

today_date.innerText = getCurrentTime();










const getInfo = async (event) =>{
    event.preventDefault();
    // alert("hii");
    
    let cityVal = InputedCity.value ;

    if(cityVal === ""){
        city_name.innerText = "Plz write the name before search";
        middle_layer.classList.add("data_hide");
    }else {
        try{

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=3b1a4ba872984fba22eb956700395201`;
            // let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=3b1a4ba872984fba22eb956700395201`;
            const response = await fetch(url);

            // "response" is in form of JSON
            const data = await response.json();     // convert : JSON --> JS Object
            const arrData = [data];                 // convert : JS object --> Array of an JS object 

            // console.log(data, typeof(data));    

            temp_real_val.innerText = arrData[0].main.temp; 
            // temp.innerText = (parseInt(arrData[0].main.temp) - 273.15).toFixed(2); 
            
            // city_name.innerHTML = arrData[0].name;
            city_name.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            
            const tempMood = arrData[0].weather[0].main ; // arrData is array at index 0, weather is also an array on it's 0 index 
            if(tempMood == "Clear"){
                temp_status.innerHTML = `<i class="fa fa-sun" style="color : #eccc68"></i>`;
            }
            else if (tempMood == "Clouds"){
                temp_status.innerHTML = `<i class="fa fa-cloud" style="color : #f1f2f6"></i>`;      
            }
            else if (tempMood == "Rain"){
                temp_status.innerHTML = `<i class="fa fa-cloud-rain" style="color : #a4b0be"></i>`;
            }
            else{
                temp_status.innerHTML = `<i class="fa fa-cloud" style="color : #f1f2f6"></i>`;
            }
            middle_layer.classList.remove("data_hide");

        }catch{
            city_name.innerText = "Plz enter city name properly";
            middle_layer.classList.add("data_hide");
        }

    }

}

SubmitBtn.addEventListener('click', getInfo)

