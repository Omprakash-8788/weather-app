import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Main from "./components/main";
import DropDown from "./components/dropDown";

function App() {
  const [enterCity, setEnterCity] = useState(false);
  const [selectCity, setSelectCity] = useState(false);

  const enterFunction = () => {
    setEnterCity(true);
    setSelectCity(false);
  };
  const selectFunction = () => {
    setSelectCity(true);
    setEnterCity(false);
  };

  return (
    <>
      <div className="display">
        <h3 onClick={selectFunction}>Search by Selecting city name</h3>
        <h3 onClick={enterFunction}>Search by Entering city name</h3>
      </div>
      {!enterCity ? <DropDown /> : <Main />}
    </>
  );
}

export default App;
