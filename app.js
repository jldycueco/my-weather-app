window.addEventListener('load', () => {
	const iconContainer   = document.querySelector('#icon'),
		  description     = document.querySelector('#weather-description'),
		  temperature     = document.querySelector('#temperature'),
		  temperatureSpan = document.querySelector('#temperature-container span'),
		  windSpeed	      = document.querySelector('#wind-speed'),
		  windSpan        = document.querySelector('#wind-humidity-container span'),
		  humidity        = document.querySelector('#humidity'),
		  location        = document.querySelector('#location'),
		  dateTime        = document.querySelector('#date-time');


	console.log(description, temperature, windSpeed, humidity, location);
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			const lat = position.coords.latitude;
			const long = position.coords.longitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api =`${proxy}https://api.darksky.net/forecast/cb56d9920605d7bf2164d926ce8798c8/${lat},${long}`;
		
			fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);

				const {temperature, summary, icon, humidity, windSpeed} = data.currently
				description.textContent = summary;
				temperature.textContent = temperature;
				windSpeed.textContent = windSpeed;
				humidity.textContent = humidity;
				location.textContent = data.timezone;
				console.log(temperature, windSpeed, humidity);

				//Set Icon
				setIcons(icon, iconContainer);
			});
		});
	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({"color": "white"});
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});