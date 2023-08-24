import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllData from "./pages/AllData";
import CreateSensor from "./pages/CreateSensor";
import CreateLocation from "./pages/CreateLocation";
import { Layout } from "./Components/Layout";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { blue, purple } from "@material-ui/core/colors";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Logs from "./pages/Logs";
import UserInteraction from "./pages/UserInteraction";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#FFB400",
    },
    // primary: {
    //   main: "#FFB400",
    //   light: "#FFB400",
    //   dark: "#FFB400",
    // },
  },

  typography: {
    fontFamily: "Montserrat",
  },
});

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(null);

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
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
            console.log(data, "HERE APPJS");
          }
          return data;
        });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Signup} path="/signup" />
          <Layout>
            <Route component={AllData} exact path="/" />
            {userDetails && userDetails.is_staff ? (
              <Box>
                <Route component={CreateSensor} exact path="/createSensor" />
                <Route
                  component={CreateLocation}
                  exact
                  path="/createLocation"
                />
                <Route
                  component={Logs}
                  exact
                  path="/userLogs"
                />
                <Route
                  component={UserInteraction}
                  exact
                  path="/userInteractions"
                />
              </Box>
            ) : null}
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
