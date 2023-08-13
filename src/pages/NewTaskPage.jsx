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
import { NavLink, useNavigate, useParams } from "react-router-dom";

// ----------------------------------------------------------------------

const defaultTheme = createTheme();

let initialFormValues = {
  description: "",
  target_timer: "",
  limit_date: null,
  limit_time: null,
  is_completed: "",
};

function NewTaskPage() {
  const { id } = useParams();
  const [card, setCard] = useState({});
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
        target_timer: "no",
        is_completed: "no",
      }));
    }
    console.log(formValues);
  }, []);

  useEffect(() => {
    getTypes();
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

  const getCard = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getCard(token, id);
      setCard(data.card);
      console.log(data.card);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //para ver los cambios de valor de los inputs TODO
  // useEffect(() => {
  //   console.log("formValues changed:", formValues);
  //   console.log("card changed:", card);
  // }, [formValues, card]);
  //-----------------

  const redirect = () => {
    navigate("/users/my-cards-tasks");
  };

  const createTask = async () => {
    setIsLoading(true);
    const descriptionTrim = formValues.description.trim();
    if (descriptionTrim.length == 0) {
      setError("Description cannot be empty.");
      setIsLoading(false);
      setTimeout(dismissAlert, 5000);
    } else {
      try {
        const data = await userService.createTaskForCard(token, formValues, id);
        console.log(data);
        setSuccess(true);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
        console.log("userInfo:", userInfo); //TODO borrar los conole.log
        console.log("initialFormValues:", initialFormValues);
        console.log("formValues:", formValues);
        setTimeout(dismissAlert, 5000);
      } finally {
        setIsLoading(false);
      }
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
          Task created successfully!
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
              {`New task for card ${card.title}`}
            </Typography>
          </Box>

          <Box
            component="form"
            sx={{
              backgroundColor: "white",
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
                    id="description"
                    label="Description"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                  />
                  <Box>
                    <FormControlLabel
                      control={
                        <Switch
                          color="secondary"
                          onChange={(e) => {
                            handleChange({
                              target: {
                                name: "target_timer",
                                value: e.target.checked ? "yes" : "no",
                              },
                            });
                          }}
                        />
                      }
                      label="Target date" //TODO
                    />
                    <Tooltip title="Choose if you want to set a limit date for this task.">
                      <IconButton>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {formValues.target_timer == "yes" && (
                    <Stack direction="column" spacing={2}>
                      <TextField
                        fullWidth
                        id="limit_date"
                        label="Limit date"
                        name="limit_date"
                        value={formValues.limit_date || ""}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          inputProps: {
                            type: "date",
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        id="limit_time"
                        label="Limit time"
                        name="limit_time"
                        value={formValues.limit_time || ""}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          inputProps: {
                            type: "time",
                          },
                        }}
                      />
                    </Stack>
                  )}
                </Stack>
              </Grid>
            </Grid>
            <Grid>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to="/users/my-cards-tasks"
                >
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3 }}
                    color="secondary"
                  >
                    go back
                  </Button>
                </NavLink>
                <Button
                  color="secondary"
                  type="button"
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() => {
                    createTask(formValues);
                  }}
                >
                  Create task
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default NewTaskPage;
