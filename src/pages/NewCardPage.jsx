import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
//
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
//
import userService from "../_services/userService";
import { NavLink, useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const defaultTheme = createTheme();

let initialFormValues = {
  type_id: "",
  title: "",
  category: "",
  is_completed: "",
};

function NewCardPage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [types, setTypes] = useState([]);

  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.userInfo.role);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAdmin = userRole == "admin";
  const isUser = userRole == "user";

  useEffect(() => {
    if (isUser) {
      setFormValues((oldState) => ({
        ...oldState,
        user_id: userInfo.userId,
        type_id: 4,
        category: "not_resettable",
        is_completed: "no",
      }));
    }
    console.log(formValues);
  }, []);

  useEffect(() => {
    getTypes();
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

  const getTypes = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getTypes(token);
      setTypes(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //para ver los cambios de valor de los inputs
  useEffect(() => {
    console.log("formValues changed:", formValues);
  }, [formValues]);
  //-----------------

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      type_id: data.get("type_id"),
      title: data.get("title"),
      category: data.get("category"),
    });
    if (!formValues.title.trim()) {
      setError("Title cannot be empty."); //TODO
    } else {
      setError(null);
      setFormValues(formValues);
      createCard(formValues);
    }
  };

  const redirect = () => {
    navigate("/users/my-cards-tasks");
  };

  const createCard = async () => {
    setIsLoading(true);
    try {
      const data = await userService.createCard(token, formValues);
      console.log(data);
      setSuccess(true);
      setTimeout(dismissAlert, 5000);
      setTimeout(redirect, 5000);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      console.log("userInfo:", userInfo);
      console.log("initialFormValues:", initialFormValues);
      console.log("formValues:", formValues);
      setTimeout(dismissAlert, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissAlert = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success">
          <AlertTitle>Succes</AlertTitle>
          Appointment created successfully!
        </Alert>
      )}
      <Container component="main" maxWidth="md">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ mt: 1, mb: 4 }}>
            <Typography component="h1" variant="h5">
              New card
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
            }}
          >
            <Grid container spacing={2}>
              <Grid>
                <Stack direction="column" spacing={2}></Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="column" spacing={2}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
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
                  sx={{ mt: 3 }}
                  onClick={() => {
                    createCard(formValues);
                  }}
                >
                  Create card
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default NewCardPage;
