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

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import userService from "../_services/userService";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { format } from "date-fns";

const initialformValues = {
  description: "",
  target_timer: "",
  limit_date: "",
  limit_time: "",
  is_completed: "",
};

function EditTaskPage() {
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [formValues, setFormValues] = useState(initialformValues);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [initialDescription, setInitialDescription] = useState("");

  useEffect(() => {
    getTask();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((oldState) => {
      let updatedValues = {
        ...oldState,
        [name]: value,
      };

      if (name === "target_timer" && value === "no") {
        updatedValues = {
          ...updatedValues,
          limit_date: null,
          limit_time: null,
        };
      }

      return updatedValues;
    });
  };
  const getTask = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getTask(token, id);
      setTask(data.task);
      setInitialDescription(data.task.description);
      setFormValues({
        description: data.task.description,
        target_timer: data.task.target_timer,
        limit_date: data.task.limit_date
          ? format(new Date(data.task.limit_date), "yyyy-MM-dd")
          : null,
        limit_time: data.task.limit_time,
        is_completed: data.task.is_completed,
      });
      console.log(data.task);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTask = async () => {
    setIsLoading(true);
    try {
      const data = await userService.saveTask(token, formValues, id);
      setTask(data);
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
  // useEffect(() => {
  //   console.log("task state updated:", task);
  //   console.log("formValues state updated:", formValues);
  // }, [task, formValues]);

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
          <Box
            sx={{
              marginTop: 8,
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ mt: 1, mb: 4 }}>
              <Typography component="h1" variant="h5">
                {`Task: ${initialDescription}`}
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
                      autoComplete="description"
                      value={formValues.description}
                      onChange={handleChange}
                    />
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                          color="secondary"
                            checked={formValues.target_timer == "yes"}
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
                          label="Target day"
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
                          label="Target hour"
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
                      saveTask(formValues);
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
export default EditTaskPage;
