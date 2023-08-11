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
        target_timer: "no",
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

  //para ver los cambios de valor de los inputs TODO
  useEffect(() => {
    console.log("formValues changed:", formValues);
  }, [formValues]);
  //-----------------

  const handleSubmit = (event) => {
    event.preventDefault(); //TODO wtf es prevent default
    const data = new FormData(event.currentTarget);

    console.log({
      description: data.get("type_id"),
      target_timer: data.get("target_timer"),
      limit_date: data.get("limit_date"),
      limit_time: data.get("limit_time"),
      category: data.get("category"),
    });
    if (!formValues.description.trim()) {
      setError("Description cannot be empty."); //TODO
    } else {
      setError(null);
      setFormValues(formValues);
      createTask(formValues);
    }
  };

  const redirect = () => {
    navigate("/users/my-cards-tasks");
  };

  const createTask = async () => {
    setIsLoading(true);
    try {
      const data = await userService.createTaskForCard(token, formValues, id);
      console.log(data);
      setSuccess(true);
      setTimeout(dismissAlert, 5000);
      setTimeout(redirect, 5000);
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
              {`NewTaskPage task for card`} //TODO
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
                        // required
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
                        // required
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
                  <Button type="button" variant="contained" sx={{ mt: 3 }}>
                    Cancel
                  </Button>
                </NavLink>
                <Button
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
    </ThemeProvider>
  );
}
export default NewTaskPage;
