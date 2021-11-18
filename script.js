const secret_api = "at_eAvMR4VBvNfbIz1G8lLBye0oo0Tt6";
const bypass_cors_url = "https://cors-anywhere.herokuapp.com/";
const api_url = "https://geo.ipify.org/api/";
let current_version = "v1";

const ip_address = document.getElementById("ip-address");
const location_d = document.getElementById("location");
const timezone_d = document.getElementById("timezone");
const isp_d = document.getElementById("isp");

const searchbutton = document.getElementById("submit");
const enteredIp = document.getElementById("search");

const headers_option = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

var mymap = L.map("mapid").setView([10.4918, -61.2225], 9);

L.tileLayer(
  "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ZSLToIy9aXa7P5YPhCuC",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(mymap);

updateMarker = (coords) => {
  mymap.setView(coords);
  L.marker(coords).addTo(mymap);
};

getIpDetails = (default_ip) => {
  if (default_ip == undefined) {
    var ip_url = `${bypass_cors_url}${api_url}${current_version}?apiKey=${secret_api}`;
  } else {
    var ip_url = `${bypass_cors_url}${api_url}${current_version}?apiKey=${secret_api}&ipAddress=${default_ip}`;
  }

  fetch(ip_url, headers_option)
    .then((res) => res.json())
    .then((data) => {
      ip_address.innerHTML = data.ip;
      location_d.innerHTML = data.location.city;
      timezone_d.innerHTML = data.location.timezone;
      isp_d.innerHTML = data.isp;
      coords = [data.location.lat, data.location.lng];
      updateMarker(coords);
    })
    .catch((err) => {
      console.log(err);
      alert("Please enter valid ip");
    });
};

searchbutton.addEventListener("click", (e) => {
  e.preventDefault();
  if (enteredIp.value != "" && enteredIp.value != null) {
    getIpDetails(enteredIp.value);
    alert("One moment please");
    return;
  }

  alert("Please enter a valid IP");
});
