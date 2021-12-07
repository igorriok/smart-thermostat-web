import logo from './logo.svg';
import './App.css';

const baseUrl = "http://raspberypi.local";

function App() {

  const houseTemp = 23;
  const themperatureSet = 24;
  const humidity = 0;
  const pressure = 0;

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
            themperatureSet
          }
        </h4>
      </div>

    </div>
  );
}

export default App;
