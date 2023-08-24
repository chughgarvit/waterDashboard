import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Box, makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import LocationCard from "../Components/Location/LocationCard";

const useStyles = makeStyles({
  btn: {
    color: "pink",
    backgroundColor: "blue",
    margin: "auto",
    "&:hover": {
      backgroundColor: "purple",
    },
  },
  title: {
    color: "blue",
    textDecoration: "underline",
  },
  field: {
    marginBottom: 21,
    marginLeft: 21,
  },
});

// Getting the data from the JSON file.
export default function AllData() {
  const classes = useStyles();
  const history = useHistory();
  const [locationData, setLocationData] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(null);

  const deleteSensor = async (sensor_id) => {
    if (window.confirm("Are you sure want to delete?") == false) {
      return;
    }
    const formData = {
      sensor_id: sensor_id,
    };
    const settings = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch("api/sensorDataAPI/", settings);
    var data = await response.json();
    setLocationData([...data]);
  };

  function isLoggedIn() {
    const token = localStorage.getItem("token");
    return token !== null;
  }

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/login";
    return
  }



  useEffect(() => {
    
    const flag = isLoggedIn();
    if (!flag) {
      window.location.href = "/login";
    } else {
      const token = JSON.parse(localStorage.getItem("token"));
      fetch("/accounts/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.code == "token_not_valid") {
            handleLogout();
          } else {
            setUserDetails(data);
          }
          return data;
        });
    }
  }, []);


  const getData = async (token) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const response = await fetch("api/locationDataAPI/", settings);
    var data = await response.json();
    setLocationData([...data]);
    console.log(data);
  };

  useEffect(async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if(token) {
      getData(token);
      const intervalCall = setInterval(() => {
        getData(token);
      }, 5000);
      return () => {
        // clean up
        clearInterval(intervalCall);
      };
    } else {
      handleLogout();
    }

  }, []);


  // const sendUserTime = async (token) => {
  //   const settings = {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token.access}`,
  //     },
  //   };

  //   const response = await fetch("api/getUserInteraction/", settings);
  //   var data = await response.json();
  //   console.log(data);
  // };

  // useEffect(async () => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   if(token) {
  //     sendUserTime(token);
  //     const intervalCall = setInterval(() => {
  //       sendUserTime(token);
  //     }, 5000);
  //     return () => {
  //       // clean up
  //       clearInterval(intervalCall);
  //     };
  //   } else {
  //     handleLogout();
  //   }
    

  // }, []);




  return (
    <React.Fragment>
      <Box>
        {locationData.length == 0 ? (
          <Typography
            variant="h5"
            align="left"
            component="h5"
            gutterBottom
            color="textSecondary"
          >
            Currently No Device Is Added!
          </Typography>
        ) : (
          <Typography
            variant="h5"
            align="left"
            component="h5"
            gutterBottom
            color="textSecondary"
          >
            Devices Data
          </Typography>
        )}

        {locationData &&
          locationData.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              deleteSensor={deleteSensor}
              userDetails={userDetails}
            />
          ))}
      </Box>
    </React.Fragment>
  );
}
