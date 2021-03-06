import React, { useEffect, useState } from "react";
import lessImg from "../images/expand_more_black_48dp.svg";
import moreImg from "../images/expand_less_black_48dp.svg";
import "./Home.css";
import Switch from "../elements/Switch";


const baseUrl = "http://raspberrypi.local:30578";

export default function HomePage() {

	const [houseTemp, setHouseTemp] = useState<number>(0);
	const [heat, setHeat] = useState<boolean>(false);
	const [temperatureSet, setTemperatureSet] = useState<number>(0);
	const [humidity, setHumidity] = useState<number>(0);
	const [pressure, setPressure] = useState<number>(0);
	const [manual, setManual] = useState<boolean>(false);


	useEffect(() => {
		getState();
	}, []);

	const getState = async () => {

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

				// console.log(data);
				
				setHeat(data.heat);
				setManual(data.manual);
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
				setTemperatureSet(data.temperatureSet);

			})
			.catch((error) => {

				console.error("Could not get data from server");
				console.error(error);

			});

	}

	const modifyTemperature = async (modifier: number) => {

		const newTeperature = temperatureSet + modifier;

		setTemperatureSet(newTeperature);

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
				body: JSON.stringify({ temperatureSet: newTeperature }),
			})
			.then((response) => {

				// console.log(response);
				return response.json();

			},
			)
			.then((data) => {

				console.log(data);
				
				setTemperatureSet(data.temperatureSet);
				setHeat(data.heat);
			})
			.catch((error) => {

				console.error("Could not set temperature");
				console.error(error);

			});

	}

	
	const switchHeat = async (newValue: boolean) => {

		setHeat(newValue);

		fetch(baseUrl + "/settings/heat",
			{
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ state: newValue }),
			})
			.then((response) => {

				// console.log(response);
				return response.json();
			},
			)
			.then((data) => {

				console.log(data);
				setHeat(data.heat);
			})
			.catch((error) => {

				console.error("Could not set heat value");
				console.error(error);
			});

	}

	const switchManual = async (newValue: boolean) => {

		setManual(newValue);

		fetch(baseUrl + "/settings/heat/manual",
			{
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ manual: newValue }),
			})
			.then((response) => {

				// console.log(response);
				return response.json();
			},
			)
			.then((data) => {

				console.log(data);
				setManual(data.manual);
			})
			.catch((error) => {

				console.error("Could not set manual value");
				console.error(error);
			});

	}


	return (
		<div className="page">

			<h2>
				Smart thermostat
			</h2>

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

			<div id="manualSwitchContainer" className="container">
				<h4>
					Manual switch:
				</h4>
				<Switch
					value={manual}
					setValue={switchManual}
				/>
			</div>

			{
				!manual &&
					<div id="themperatureSetContainer">
						<h4>
							Wanted themperature:
						</h4>
						<button
							onClick={() => modifyTemperature(1)}
						>
							<img src={moreImg} alt="less"/>
						</button>
						<p>
							{
								temperatureSet
							}
						</p>
						<button
							onClick={() => modifyTemperature(-1)}
						>
							<img src={lessImg} alt="less"/>
						</button>
					</div>
			}

			<div id="heatStatusContainer" className="container">
				<h4>
					Heat is:
				</h4>
				<Switch
					value={heat}
					setValue={switchHeat}
					disabled={!manual}
				/>
			</div>

		</div>
	);

}
