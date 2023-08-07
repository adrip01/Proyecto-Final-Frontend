import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import userService from "../_services/userService";
import { NavLink } from "react-router-dom";

function MyCardsTasksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [userCardsTasks, setUserCardsTasks] = useState([]);

  useEffect(() => {
    getMyCardsTasks();
  }, []);

  const getMyCardsTasks = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getMyCardsTasks(token);
      setUserCardsTasks(data.userCards);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 3,
          mx: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Your cards and tasks</Typography>
        <NavLink style={{ textDecoration: "none" }} to="/users/new-card">
          <Button type="button" variant="contained">
            New Card
          </Button>
        </NavLink>
      </Box>
      {userCardsTasks.length > 0 ? (
        <Grid container>
          {userCardsTasks.map((userCards) => (
            <Grid item xs={12} sm={6} md={4} key={userCards.id}>
              <Card sx={{ mx: 2, my: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 3,
                      mx: 2,
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: 24,
                      }}
                    >
                      {userCards.title}
                    </Typography>
                    <NavLink
                      style={{ textDecoration: "none" }}
                      to="/users/new-task"
                    >
                      <Button type="button" variant="contained">
                        +
                      </Button>
                    </NavLink>
                  </Box>
                  <List>
                    {userCards.tasks ? (
                      userCards.tasks.map((task) => (
                        <ListItem key={task.id}>
                          <ListItemText primary={task.description} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No tasks in here" />
                      </ListItem>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <ListItem>
          <ListItemText primary="There is nothing here. Create some new cards." />
        </ListItem>
      )}
    </Box>
  );
}
export default MyCardsTasksPage;
