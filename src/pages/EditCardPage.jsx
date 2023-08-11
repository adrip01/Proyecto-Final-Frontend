import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import {
  Alert,
  AlertTitle,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ThemeProvider, styled } from "@mui/material/styles";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import userService from "../_services/userService";
import { NavLink, useParams } from "react-router-dom";

const initialformValues = {
  type_id: "",
  title: "",
  category: "",
  is_completed: "",
};

function EditCardPage() {
  const [card, setCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [formValues, setFormValues] = useState(initialformValues);
  const [types, setTypes] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getCard();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((oldState) => {
      return {
        ...oldState,
        [name]: value, // key: value
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      type_id: data.get("type_id"),
      title: data.get("title"),
      category: data.get("category"),
      is_completed: data.get("is_completed"),
    });
  };

  const getCard = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getCard(token, id);
      setCard(data.card);
      setFormValues({
        type_id: data.card.type_id,
        title: data.card.title,
        category: data.card.category,
        is_completed: data.card.is_completed,
      });
      console.log(data.card);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCard = async () => {
    setIsLoading(true);
    try {
      const data = await userService.saveCard(token, formValues, id);
      setCard(data);
      setSuccess(true);
      setTimeout(dismissAlert, 5000);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setTimeout(dismissAlert, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissAlert = () => {
    setError(null);
    setSuccess(false);
  };

  //para ver los cambios de valor de los inputs TODO
  useEffect(() => {
    console.log("Card state updated:", card);
    console.log("formValues state updated:", formValues);
  }, [card, formValues]);

  return (
    <Box>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success">
          <AlertTitle>Succes</AlertTitle>
          Changes applied successfully!
        </Alert>
      )}
      <Box
        sx={{
          backgroundColor: "#E3E3E3",
          minHeight: "100vh",
          display: "flex",
        }}
      >
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              marginTop: 8,
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ mt: 1, mb: 4 }}>
              <Typography component="h1" variant="h5">
                {`Card: ${formValues.title}`}
              </Typography>
            </Box>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 5,
                p: 3,
                borderRadius: 4,
                border: "1px solid #e8e8e8",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                backgroundColor: "#FBFBFD",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      autoComplete="title"
                      value={formValues.title}
                      onChange={handleChange}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/users/my-cards-tasks"
                  >
                    <Button type="button" variant="contained" sx={{ mt: 3 }}>
                      Cancel
                    </Button>
                  </NavLink>
                  <Button
                    type="button"
                    variant="contained"
                    startIcon={<SaveRoundedIcon />}
                    sx={{ mt: 3 }}
                    onClick={() => {
                      saveCard(formValues);
                    }}
                  >
                    Apply changes
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
export default EditCardPage;
