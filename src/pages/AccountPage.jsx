import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//
import userService from "../_services/userService";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

// ----------------------------------------------------------------------

const defaultTheme = createTheme();

const initialFormValues = {
  user_name: "",
  first_name: "",
  last_name: "",
  email: "",
  birthday: "",
  // password: "",
  // verify_password: "",
};

function AccountPage() {
  // hooks
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // glogal state hooks
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getProfile();
  }, []);

  // handlers

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((oldState) => {
      return {
        ...oldState,
        [name]: value, // key: value
      };
    });
  };

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getProfile(token);
      setUser(data.results);
      setFormValues({
        user_name: data.results.user_name,
        first_name: data.results.first_name,
        last_name: data.results.last_name,
        email: data.results.email,
        birthday: data.results.birthday
          ? format(new Date(data.results.birthday), "yyyy-MM-dd")
          : "",
      });
      console.log(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async (user) => {
    setIsLoading(true);
    try {
      const data = await userService.saveProfile(token, user);
      setUser(data.results);
      console.log(data.results);
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
          minHeight: "100vh",
          display: "flex",
        }}
      >
        <Container component="main" maxWidth="md">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ mt: 1, mb: 4 }}>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 90, color: "primary.light" }}
              />

              <Typography component="h1" variant="h5">
                Account
              </Typography>
            </Box>

            <Box
              component="form"
              sx={{
                backgroundColor: "#FFFFFF",
                mt: 5,
                p: 3,
                borderRadius: 4,
                border: "1px solid #e8e8e8",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      required
                      fullWidth
                      id="user_name"
                      label="Username"
                      name="user_name"
                      autoComplete="user_name"
                      value={formValues.user_name}
                      onChange={handleChange}
                    />
                    <TextField
                      autoComplete="given-name"
                      name="first_name"
                      fullWidth
                      id="first_name"
                      label="First Name"
                      value={formValues.first_name || ""}
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="family-name"
                      value={formValues.last_name || ""}
                      onChange={handleChange}
                    />
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      id="birthday"
                      label="Birthdate"
                      InputLabelProps={{ shrink: true }}
                      name="birthday"
                      autoComplete="birtday"
                      value={formValues.birthday || ""}
                      onChange={handleChange}
                      InputProps={{
                        inputProps: {
                          type: "date",
                        },
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/users/profile"
                  >
                    <Button
                      type="button"
                      variant="contained"
                      sx={{ mt: 3 }}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </NavLink>
                  <Button
                    color="secondary"
                    type="button"
                    variant="contained"
                    startIcon={<SaveRoundedIcon />}
                    sx={{ mt: 3 }}
                    onClick={() => {
                      saveProfile(formValues);
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
export default AccountPage;
