import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

function generateUUID() {
  var uid = "SEN" + ((Math.random() * Math.pow(36, 5)) | 0).toString(36);
  return uid;
}

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

export default function CreateSensor() {
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = useState([]);
  const [sensorId, setSensorId] = useState(generateUUID());
  const [unit, setUnit] = useState("");
  const [locationID, setLocationID] = useState("");

  const [nameError, setNameError] = useState(false);
  const [sensorIdError, setSensorIdError] = useState(false);
  const [unitError, setUnitError] = useState(false);
  const [locationIDError, setLocationIDError] = useState(false);

  const clearText = () => {
    setName("");
    setSensorId(generateUUID());
    setUnit("");
    setLocationID("");

    setNameError(false);
    setSensorIdError(false);
    setUnitError(false);
    setLocationIDError(false);
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    setNameError(false);
    setSensorIdError(false);

    if (name == "") {
      setNameError(true);
    }

    if (sensorId == "") {
      setSensorIdError(true);
    }

    if (unit == "") {
      setUnitError(true);
    }

    if (locationID == "") {
      setLocationIDError(true);
    }

    if (name && sensorId && unit && locationID) {
      const formData = {
        name: name,
        sensor_id: sensorId,
        unit: unit,
        locationID: locationID,
      };
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(
        "http://localhost:8000/api/sensorDataAPI/",
        settings
      );
      if (response.status == 200) {
        var data = await response.json();
        alert(data);
        clearText();
      } else {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Typography
          className={classes.field}
          variant="h5"
          align="left"
          component="h5"
          gutterBottom
          color="textSecondary"
        >
          Create a New Sensor
        </Typography>

        <form
          action=""
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitEvent}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                className={classes.field}
                onChange={(e) => setName(e.target.value)}
                label="Sensor Name"
                variant="outlined"
                fullWidth
                error={nameError}
                color="secondary"
                value={name}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.field}
                onChange={(e) => setLocationID(e.target.value)}
                label="Device ID"
                variant="outlined"
                fullWidth
                error={locationIDError}
                color="secondary"
                value={locationID}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                className={classes.field}
                // onChange={(e) => setSensorId(e.target.value)}
                label="Sensor Id"
                variant="outlined"
                fullWidth
                error={sensorIdError}
                color="secondary"
                value={sensorId}
                required
                aria-readonly
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.field}
                onChange={(e) => setUnit(e.target.value)}
                label="Sensor Unit"
                variant="outlined"
                fullWidth
                error={unitError}
                color="secondary"
                value={unit}
                required
              />
            </Grid>
          </Grid>

          <Button
            className={classes.field}
            type="submit"
            variant="contained"
            // disabled
            color="secondary"
          >
            Add Sensor
          </Button>
          <Button
            className={classes.field}
            // type="submit"
            onClick={clearText}
            variant="contained"
            // disabled
            color="secondary"
          >
            Reset Default
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
}
