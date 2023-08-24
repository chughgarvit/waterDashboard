import { Container, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { DeleteOutlined, AddCircleOutline } from "@material-ui/icons";
import SensorCard from "../Sensor/SensorCard";
import { de } from "date-fns/locale";
import DataCard from "./DataCard";
import Navbar from "./Navbar";

const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    margin: "10px 0px",
    padding: "10px",
    borderRadius: "3px",
    // borderLeft: "3px solid #FFB400",
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

function getData(sensors_set) {
  var AvgData = [];
  var activeSensors = 0;
  sensors_set.map((data) => {
    var temp = 0;
    var currDateTime = new Date();
    var cutOffTime = 15; // In seconds
    var isActive = false;
    data.live_sensors_set.map((liveSensor) => {
      temp += parseInt(liveSensor.data);
      if (currDateTime - new Date(liveSensor.timestamp) <= cutOffTime * 1000) {
        // Sensor is active
        isActive = true;
        activeSensors += 1;
      } else {
        // Sensor is not active
        isActive = false;
      }
    });
    temp = temp != 0 ? temp / data.live_sensors_set.length : 0;
    var obj = {
      id: data.sensor_id,
      name: `Avg. ${data.name}`,
      unit: data.unit,
      value: temp,
      isActive: isActive,
    };
    AvgData.push(obj);
  });
  return AvgData;
}

const LocationCard = ({ location, deleteSensor }) => {
  const classes = useStyles();
  const [avgData, setAvgData] = useState(getData(location.sensors_set));
  useEffect(async () => {
    setAvgData(getData(location.sensors_set));
  }, [location]);

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography>Device Name: {location.name}</Typography>
            <Typography>
              Total Sensors: {location.sensors_set.length}
            </Typography>
            {/* <Typography>Location: {location.location}</Typography> */}
          </Grid>
          <Grid item xs={5}>
            <Typography>Device ID: {location.locId}</Typography>
            <Typography>User Name: {location.userName}</Typography>
          </Grid>
        </Grid>
        <hr style={{ border: "1px solid #FFB400", background: "#FFB400" }}></hr>
        {/* {console.log("sensor data: ", location.sensors_set)}
        {console.log("avgData: ", avgData)} */}

        <Grid container spacing={2}>
          {location.sensors_set.map((data) => {
            // avgData.map(avgData => data.id==avgData.id ? )
            // let obj = avgData.find
            let obj = avgData.find((o) => o.id === data.sensor_id);
            return (
              <Grid key={data.id} item xs={4}>
                {/* let obj = avgData.find(o => o.id===data.sensor_id); */}
                <Navbar data={data} deleteSensor={deleteSensor} obj={obj} />
              </Grid>
            );
          })}
        </Grid>
        {/* <Grid container spacing={2}>

                { avgData && avgData.map((data) => (
                    <Grid key={data.id} item xs={3}>
                        <DataCard data={data}/>
                        
                    </Grid>
    
                ))} */}
      </Container>
    </React.Fragment>
  );
};

export default LocationCard;
