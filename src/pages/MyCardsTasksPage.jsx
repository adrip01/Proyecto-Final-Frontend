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
  Menu,
  MenuItem,
  Divider,
  IconButton,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import userService from "../_services/userService";
import { NavLink, useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import ChecklistIcon from "@mui/icons-material/Checklist";

import { format } from "date-fns";

import { Masonry } from "@mui/lab";

function MyCardsTasksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [userCardsTasks, setUserCardsTasks] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState({});
  const open = Boolean(anchorEl);

  const [hoveredTask, setHoveredTask] = useState(null);

  const handleOpenMenu = (event, cardId) => {
    setAnchorEl((oldState) => ({
      ...oldState,
      [cardId]: event.currentTarget,
    }));
  };
  const handleCloseMenu = (cardId) => {
    setAnchorEl((oldState) => ({
      ...oldState,
      [cardId]: null,
    }));
  };

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

  const handleEditCard = (id) => {
    navigate(`/users/edit-card/${id}`);
  };

  const handleEditTask = (id) => {
    navigate(`/users/edit-task/${id}`);
  };

  const handleDeleteCard = (id) => {
    setCardId(id);
    setDeleteType("card");
    setOpenConfirmation(true);
  };

  const handleDeleteTask = (id) => {
    setTaskId(id);
    setDeleteType("task");
    setOpenConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmation(false);
    try {
      if (deleteType == "card") {
        await userService.deleteCard(token, cardId);
      } else if (deleteType == "task") {
        await userService.deleteTask(token, taskId);
      }
      getMyCardsTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmation(false);
  };

  const handleTaskCheck = async (cardId, taskId) => {
    try {
      // find card and task
      const card = userCardsTasks.find((userCard) => userCard.id === cardId);
      if (card) {
        const task = card.tasks.find((task) => task.id === taskId);
        if (task) {
          // task state
          task.is_completed = task.is_completed === "yes" ? "no" : "yes";
          setUserCardsTasks([...userCardsTasks]);

          // save task
          try {
            await userService.saveTask(token, task, taskId);
          } catch (error) {
            console.log(error);
            setUserCardsTasks([...userCardsTasks]);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
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
          <Button type="button" variant="contained" color="secondary">
            New Card
          </Button>
        </NavLink>
      </Box>
      {userCardsTasks.length > 0 ? (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {userCardsTasks.map((userCards) => (
            <Box key={userCards.id}>
              <Card sx={{ mx: 1.5, my: 1.5 }}>
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
                        fontSize: 20,
                      }}
                    >
                      {userCards.title}
                    </Typography>
                    <IconButton
                      id={`basic-button-${userCards.id}`}
                      aria-controls={
                        open ? `basic-menu-${userCards.id}` : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleOpenMenu(event, userCards.id)}
                    >
                      <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                    <Menu
                      id={`basic-menu-${userCards.id}`}
                      anchorEl={anchorEl[userCards.id]}
                      open={Boolean(anchorEl[userCards.id])}
                      onClose={() => handleCloseMenu(userCards.id)}
                      MenuListProps={{
                        "aria-labelledby": `basic-button-${userCards.id}`,
                      }}
                    >
                      <MenuItem
                        id={`menu-item-${userCards.id}-edit`}
                        onClick={() => handleEditCard(userCards.id)}
                      >
                        <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit card</ListItemText>
                      </MenuItem>
                      <MenuItem
                        id={`menu-item-${userCards.id}-delete`}
                        onClick={() => handleDeleteCard(userCards.id)}
                      >
                        <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete card</ListItemText>
                      </MenuItem>
                    </Menu>
                  </Box>
                  <List>
                    {userCards.tasks.length > 0 ? (
                      userCards.tasks.map((task) => (
                        <ListItem
                          key={task.id}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#E0E0E0",
                              "& .hovered-icons": {
                                visibility: "visible",
                              },
                            },
                            position: "relative",
                          }}
                          onMouseEnter={() => setHoveredTask(task.id)}
                          onMouseLeave={() => setHoveredTask(null)}
                        >
                          <ListItemIcon>
                            <Checkbox
                              color="secondary"
                              checked={task.is_completed === "yes"}
                              onChange={() =>
                                handleTaskCheck(userCards.id, task.id)
                              }
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={task.description}
                            secondary={
                              (task.limit_date
                                ? format(
                                    new Date(task.limit_date),
                                    "yyyy-MM-dd"
                                  )
                                : "") +
                              (task.limit_time
                                ? " at " +
                                  format(
                                    new Date(`1970-01-01T${task.limit_time}`),
                                    "HH:mm"
                                  ) +
                                  "h"
                                : "")
                            }
                            className={
                              task.is_completed === "yes"
                                ? "completed-task"
                                : ""
                            }
                          />

                          {hoveredTask == task.id && (
                            <ListItemIcon
                              className="hovered-icons"
                              onClick={() => handleEditTask(task.id)}
                            >
                              <EditIcon fontSize="small" />
                            </ListItemIcon>
                          )}
                          {hoveredTask == task.id && (
                            <ListItemIcon
                              className="hovered-icons"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                          )}
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No tasks in here" />
                      </ListItem>
                    )}
                  </List>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`/users/new-task/${userCards.id}`}
                  >
                    <IconButton>
                      <AddIcon></AddIcon>
                    </IconButton>
                  </NavLink>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Masonry>
      ) : (
        <ListItem>
          <ListItemText primary="There is nothing here. Create some new cards." />
        </ListItem>
      )}
      <Dialog
        open={openConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {deleteType == "card" ? "Delete this card?" : "Delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteType == "card"
              ? "Are you sure you want to delete this card and all its tasks? There's no going back if you do."
              : "Are you sure you want to delete this task? There's no going back if you do."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default MyCardsTasksPage;
