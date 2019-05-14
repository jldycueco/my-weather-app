window.addEventListener('load', () => {
	const iconContainer   = document.querySelector('#icon'),
		  description     = document.querySelector('#weather-description'),
		  temperatureValue= document.querySelector('#temperature-degrees'),
		  temperatureSpan = document.querySelector('#temperature-container span'),
		  windSpeedValue  = document.querySelector('#wind-speed'),
		  windSpan        = document.querySelector('#wind-humidity-container span'),
		  humidityValue   = document.querySelector('#humidity'),
		  location        = document.querySelector('#location');

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			const lat = position.coords.latitude;
			const long = position.coords.longitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api =`${proxy}https://api.darksky.net/forecast/[API_KEY]/${lat},${long}`;
		
			fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				const {temperature, summary, icon, humidity, windSpeed} = data.currently
				description.textContent = summary;
				temperatureValue.textContent = ((temperature-32)*5/9).toFixed(2);
				windSpeedValue.textContent = (windSpeed * 1.6093).toFixed(2);
				humidityValue.textContent = `${humidity * 100} %`;
				location.textContent = data.timezone;
				
				//Set Icon
				setIcons(icon, iconContainer);

				//Change C to F and vice-versa
				temperatureSpan.addEventListener('click', ()=> {
					if(temperatureSpan.textContent === "C"){
						temperatureSpan.textContent = "F";
						temperatureValue.textContent = temperature;
					} else {
						temperatureSpan.textContent = "C";
						temperatureValue.textContent = ((temperature-32)*5/9).toFixed(2);
					}
				});

				//Change kph to mph and vice-versa
				windSpan.addEventListener('click', ()=> {
					if(windSpan.textContent === "kph"){
						windSpan.textContent = "mph";
						windSpeedValue.textContent = windSpeed;
					} else {
						windSpan.textContent = "kph";
						windSpeedValue.textContent = (windSpeed * 1.6093).toFixed(2);
					}
				});

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