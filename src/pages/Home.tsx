import React, {useEffect, useState} from "react";
import lessImg from "../images/expand_more_black_48dp.svg";
import moreImg from "../images/expand_less_black_48dp.svg";


const baseUrl = "http://raspberrypi.local:30578";

export default function HomePage() {
	const [houseTemp, setHouseTemp] = useState(0);
	const [heat, setHeat] = useState<boolean>(false);
	const [temperatureSet, setTemperatureSet] = useState(0);
	const [humidity, setHumidity] = useState(0);
	const [pressure, setPressure] = useState(0);


	useEffect(() => {
		setInterval(getTemperature, 5000);
	}, []);

	const getTemperature = async () => {
		await fetch(baseUrl,
			{
				method: "GET", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Accept": "application/json",
				},
			})
			.then((response) => {
				// console.log(response);
				return response.json();
			},
			)
			.then((data) => {
				console.log(data);
				
				setTemperatureSet(data.temperature);
				setHeat(data.heat);
			})
			.catch((error) => {
				console.error("Could not get data from server");
				console.error(error);
			});
	}
	
	useEffect(() => {
		setInterval(getData, 3000);
	}, []);

	const getData = async () => {
		// console.log("get data")

		await fetch(baseUrl + "/data",
			{
				method: "GET", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Accept": "application/json",
				},
			})
			.then((response) => {
				// console.log(response);
				return response.json();
			},
			)
			.then((data) => {
				// console.log(data);
				
				setHouseTemp(data.temperature.toFixed(1));
				setPressure(data.pressure.toFixed(2));
				setHumidity(data.humidity.toFixed(2));
			})
			.catch((error) => {
				console.error("Could not get data from server");
				console.error(error);
			});
	}

	const modifyTemperature = async (modifier: number) => {
		const newTeperature = temperatureSet + modifier;

		await fetch(baseUrl + "/settings",
			{
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				body: JSON.stringify({temperatureSet: newTeperature}),
			})
			.then((response) => {
				// console.log(response);
				return response.json();
			},
			)
			.then((data) => {
				// console.log(data);
				
				setTemperatureSet(data.temperatureSet);
			})
			.catch((error) => {
				console.error("Could not get data from server");
				console.error(error);
			});
	}


	return (
		<div className="Page">

			<div id="houseInfoContainer">

				<p>
					{
						"Humidity: " + humidity
					}
				</p>

				<p>
					{
						"Pressure: " + pressure
					}
				</p>

			</div>

			<div id="houseThemperatureContainer">

				<h4>
					{
						"House themperature: " + houseTemp
					}
				</h4>

			</div>

			<div id="themperatureSetContainer">
				<button
					onClick={() => modifyTemperature(1)}
				>
					<img src={moreImg} alt="less"/>
				</button>
				<h4>
					{
						"Wanted themperature: " + temperatureSet
					}
				</h4>
				<button
					onClick={() => modifyTemperature(-1)}
				>
					<img src={lessImg} alt="less"/>
				</button>
			</div>

			<div>
				<h4>
					{
						"Heat is: " + (heat ? "ON" : "OFF")
					}
				</h4>
			</div>
		</div>
	);
}
