import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneIcon from "@mui/icons-material/Phone";
import { styled } from "@mui/material/styles";

import userService from "../_services/userService";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

const initialuserValues = {
  user_name: "",
  first_name: "",
  last_name: "",
  email: "",
  birthday: "",
};

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [userValues, setuserValues] = useState(initialuserValues);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    setuserValues({
      user_name: user.results?.user_name,
      first_name: user.results?.first_name,
      last_name: user.results?.last_name,
      email: user.results?.email,
      birthday: user.results?.birthday,
    });
  }, [user]);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getProfile(token);
      setUser(data);
      console.log(data);
      console.log(user);
      console.log(userValues);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <Typography variant="body1">Cargando...</Typography>
        ) : (
          <Card
            variant="outlined"
            sx={{
              margin: "auto",
              marginTop: 20,
              minWidth: 350,
              alignItems: "center",
            }}
          >
            <CardContent>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <AccountCircleIcon
                      sx={{ fontSize: 90, color: "primary.light" }}
                    />
                    <Typography sx={{ mt: 4 }} variant="h4" component="div">
                      {`${userValues.user_name}`}
                    </Typography>

                    {userValues.first_name && userValues.last_name && (
                      <Typography sx={{ mb: 2 }} component="div">
                        {`${userValues.first_name} ${userValues.last_name}`}
                      </Typography>
                    )}

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <MailOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${userValues.email}`} />
                      </ListItem>
                    </List>

                    {userValues.birthday && (
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarMonthIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={format(
                              new Date(userValues.birthday),
                              "yyyy-MM-dd"
                            )}
                          />
                        </ListItem>
                      </List>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <NavLink style={{ textDecoration: "none" }} to="/users/account">
                <Button size="small">EDIT PROFILE</Button>
              </NavLink>
            </CardActions>
          </Card>
        )}
      </Box>
    </>
  );
}
