import List from "./List";
import classes from "./Searchbox.module.css";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

const NOMINATIM_BASE_URL =
  "https://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=xml&polygon_geojson=1&addressdetails=1";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};
const pressHandler = (event) => {
  console.log(event);
};
const SearchBox = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listPlace, setListPlace] = useState([]);

  const fetchInfo = () => {
    const params = {
      q: searchTerm,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const queryString = new URLSearchParams(params).toString();

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}&${queryString}`, requestOptions)
      .then((res) => res.text())
      .then((res) => {
        setListPlace(JSON.parse(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.SearchBox}>
      <div className={classes.SearchBoxContent}>
        <TextField
          className={classes.search}
          id="filled-basic"
          label="Search Address"
          variant="filled"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (searchTerm !== "") {
              if (e.code === "Enter") {
                fetchInfo();
              }
            }
          }}
        />
        <Button
          onKeyDown={pressHandler}
          className={classes.button}
          variant="contained"
          onClick={fetchInfo}
        >
          Search
        </Button>
      </div>
      <div>
        <List
          listPlace={listPlace}
          setSelectedPosition={props.setSelectedPosition}
          setLocationName={props.setLocationName}
        />
      </div>
    </div>
  );
};

export default SearchBox;
