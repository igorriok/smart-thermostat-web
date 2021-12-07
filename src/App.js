import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const baseUrl = "http://raspberrypi.local:30578";

function App() {

  const [ houseTemp, setHouseTemp ] = useState(0);
  const [ themperatureSet, setThemperatureSet ] = useState(0);
  const [ humidity, setHumidity ] = useState(0);
  const [ pressure, setPressure ] = useState(0);

  useEffect(() => {

    fetch(baseUrl,
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
        
        setThemperatureSet(data.themperature);
      })
      .catch((error) => {
        console.error("Could not get data from server");
        console.error(error);
      });

  },[]);

  return (
    <div className="App">

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
        <h4>
          {
            "Wanted themperature: " + themperatureSet
          }
        </h4>
      </div>

    </div>
  );
}

export default App;
