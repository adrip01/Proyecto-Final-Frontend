import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";

import "./ResponsiveAppBar.module.scss";
import { updateAuthStateLogout } from "../../../features/authentication/updateAuthState";
import { useSelector } from "react-redux";

const handleLogout = () => {
  console.log("logout");
  updateAuthStateLogout();
};

const pages = [{ title: "Home", path: "/" }];
const settings = [
  { title: "Profile", path: "/users/profile", handle: null },
  { title: "My Cards", path: "/users/my-cards-tasks", handle: null },
  { title: "Logout", path: "/", handle: handleLogout },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userInfo.name);
  const userRole = useSelector((state) => state.auth.userInfo.role);
  const isAdmin = userRole == "admin";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color={isAdmin ? "error" : "primary"}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccessibilityNewIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "roboto",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={page.path}
                  key={page.title}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <AccessibilityNewIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "roboto",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                style={{ textDecoration: "none" }}
                to={page.path}
                key={page.title}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              </NavLink>
            ))}
          </Box>

          {!isLoggedIn && (
            <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
              <NavLink style={{ textDecoration: "none" }} to="/login">
                <Button
                  variant="contained"
                  size="small"
                  // startIcon={<LoginTwoToneIcon />}
                  sx={{
                    my: 2,
                    mr: 1,
                    color: "white",
                    bgcolor: "primary.dark",
                  }}
                >
                  Login
                </Button>
              </NavLink>

              <NavLink style={{ textDecoration: "none" }} to="/register">
                <Button
                  variant="contained"
                  size="small"
                  //startIcon={<AppRegistrationTwoToneIcon />}
                  sx={{
                    my: 2,
                    color: "white",
                    bgcolor: "primary.dark",
                  }}
                >
                  Sign Up
                </Button>
              </NavLink>
            </Box>
          )}

          {isAdmin && (
            <Box sx={{ flexGrow: 0, display: { xs: "flex" }, mr: 4 }}>
              <NavLink style={{ textDecoration: "none" }} to="/admin">
                <Button
                  variant="contained"
                  startIcon={<AccessibilityNewIcon />}
                  color="warning"
                  sx={{
                    my: 2,
                    color: "white",
                  }}
                >
                  Admin panel
                </Button>
              </NavLink>
            </Box>
          )}

          {/* user settings */}
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar
                           alt="Remy Sharp"
                           src="/static/images/avatar/2.jpg"
                        /> */}
                  <AccountCircleIcon
                    sx={{
                      display: { xs: "flex" },
                      mr: 1,
                      color: "white",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem sx={{ cursor: "default", pointerEvents: "none" }}>
                  <Typography textAlign="center" fontWeight={500}>
                    Hi, {userName}
                  </Typography>
                </MenuItem>
                <Divider />
                {settings.map((setting) => (
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={setting.path}
                    key={setting.title}
                    onClick={setting.handle}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  </NavLink>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
