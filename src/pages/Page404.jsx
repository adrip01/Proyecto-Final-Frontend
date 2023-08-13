import React from "react";
import { Box, Typography, Container } from "@mui/material";

function Page404() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Container>
        <Typography variant="h1" align="center" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Oops! There's nothing here.
        </Typography>
        <Box display="flex" justifyContent="center"></Box>
      </Container>
    </Box>
  );
}
export default Page404;
