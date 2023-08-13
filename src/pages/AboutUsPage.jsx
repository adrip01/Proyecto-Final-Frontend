import React from "react";
import { Container, Typography, Button, Box, Grid, Paper } from "@mui/material";

function AboutUsPage() {
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
                About Us
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                At JournApp, we believe that staying organized should be easy
                and intuitive. Our mission is to provide you with a powerful yet
                user-friendly tool that helps you manage your tasks, projects,
                and goals with ease.
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Whether you're a professional looking to streamline your work
                tasks or a student juggling assignments and exams, JournApp is
                designed to adapt to your unique needs and preferences.
              </Typography>
              <Typography variant="body1" align="center">
                Our team is dedicated to continuously improving and enhancing
                the JournApp experience. We're here to support you on your
                journey to becoming more organized and productive.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default AboutUsPage;
