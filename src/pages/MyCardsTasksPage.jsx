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
} from "@mui/material";
import { useSelector } from "react-redux";
import userService from "../_services/userService";
import { NavLink, useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

function MyCardsTasksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [userCardsTasks, setUserCardsTasks] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [cardId, setCardId] = useState(null);
  const navigate = useNavigate();

  const [menu, setMenu] = useState({});
  const open = Boolean(menu);

  const handleOpenMenu = (event, cardId) => {
    setMenu((oldState) => ({
      ...oldState,
      [cardId]: event.currentTarget,
    }));
  };
  const handleCloseMenu = (cardId) => {
    setMenu((oldState) => ({
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

  const handleDeleteCard = (id) => {
    setCardId(id);
    setOpenConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmation(false);
    try {
      await userService.deleteCard(token, cardId);
      getMyCardsTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmation(false);
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
          <Button type="button" variant="contained">
            New Card
          </Button>
        </NavLink>
      </Box>
      {userCardsTasks.length > 0 ? (
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            {userCardsTasks.map((userCards) => (
              <Card sx={{ mx: 1.5, my: 1.5 }} key={userCards.id}>
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
                      menu={menu[userCards.id]}
                      open={Boolean(menu[userCards.id])}
                      onClose={() => handleCloseMenu(userCards.id)}
                      MenuListProps={{
                        "aria-labelledby": `basic-button-${userCards.id}`,
                      }}
                    >
                      <MenuItem onClick={handleCloseMenu}>
                        <ListItemIcon>
                          <VisibilityIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Details</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMenu}>
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
                        <ListItem key={task.id}>
                          <ListItemText primary={task.description} />
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
                    to="/users/new-task"
                  >
                    <IconButton>
                      <AddIcon></AddIcon>
                    </IconButton>
                  </NavLink>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
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
        <DialogTitle id="alert-dialog-title">{"Delete this card?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this card? There's no going back if
            you do.
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
