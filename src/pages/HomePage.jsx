import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  ThemeProvider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Paper sx={{ padding: 3 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h3" align="center" gutterBottom>
                Welcome to JournApp - Your Partner in Organization
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Hello and welcome to JournApp! If you've ever felt that daily
                tasks, pending items, and activities are piling up and something
                important is slipping through the cracks, you're in the right
                place! JournApp is an app designed to help you maintain a clear
                and organized record of all your tasks, projects, and goals.
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                What can you do with JournApp?
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                <strong>• Create Custom Task Lists:</strong> Create specific
                lists for different areas of responsibility, whether it's work,
                studies, home, or personal projects.
                <br />
                <strong>• Add Detailed Tasks:</strong> Break down your tasks
                into manageable steps. Add descriptions and due dates to stay on
                the right track.
                <br />
                <strong>• Check Off Completed Tasks:</strong> Enjoy the
                satisfaction of marking a task as complete. Watching your
                progress is rewarding and motivating!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={isLoggedIn ? "/users/my-cards-tasks" : "/login"}
                >
                  <Button variant="contained" color="secondary" size="large">
                    Get Started
                  </Button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
export default HomePage;
