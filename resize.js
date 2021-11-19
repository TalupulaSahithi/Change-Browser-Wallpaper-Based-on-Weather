const url1 = "https://ipinfo.io/json";
getapi(url1);
async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    let city = data.city;
    let region = data.region;
    getapi1(city, region);
}
async function getapi1(city, region) {
    const url2 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + region + "&appid=aadbc37c25511db19062a5d143defe01&units=metric";
    const response = await fetch(url2);
    var weather_data = await response.json();
    console.log(weather_data);
    document.getElementById("city").innerText = weather_data.name + ", " + weather_data.sys.country;
    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    let temperature = document.getElementById('temp');
    temperature.innerHTML = weather_data.main.temp + "&#8451";


    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = weather_data.main.temp_min + "&#8451" + "(min)/" + weather_data.main.temp_max + "&#8451" + "(max)";
   

    let weatherType = document.getElementById('weather');
    let weather_type = weather_data.weather[0].main
    weatherType.innerText = weather_type;
    let d;
    if (todayDate.getHours() > 17 && todayDate.getHours() <= 24){
        d="night";
    }else{
        d="day";
    }
    getapi2(weather_type,d);
}
    async function getapi2(weather_type,d) {
        const url3 = "https://api.unsplash.com/search/photos?query="+weather_type+","+d+"&client_id=xDuigJ8mTZyMNpvrQHkwYwRWhwTWvpEvAWR0RZRM9tQ";
        const response = await fetch(url3);
        var imagedata = await response.json();
        console.log(imagedata);
        var imageurl=imagedata.results[1].urls.full;
        document.body.style.backgroundImage = "url("+imageurl+")";

   }

function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return date + " " + month + "(" + day + ")," + year;
}
