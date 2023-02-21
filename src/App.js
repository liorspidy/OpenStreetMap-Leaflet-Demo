import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";
import classes from "./App.module.css";

function App() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [locationName, setLocationName] = useState("");
  return (
    <div className={classes.mainBox}>
      <div className={classes.mapsBox}>
        <Maps
          selectedPosition={selectedPosition}
          locationName={locationName}
          setLocationName={setLocationName}
        />
      </div>
      <div className={classes.Box}>
        <SearchBox
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
          setLocationName={setLocationName}
        />
      </div>
    </div>
  );
}

export default App;
