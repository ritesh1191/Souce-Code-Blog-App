import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = anchorEl;

  const handleClick = () => {
    setAnchorEl(true);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {}
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant={"h4"} marginRight={"15%"}>
            <i class="fa-sharp fa-solid fa-blog"></i>
          </Typography>

          {/* {isLogin && (
            <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )} */}

          {isLogin && (
            <Box marginLeft={"auto"} marginRight={"auto"}>
              <Button
                sx={{ margin: 1, color: "white", borderRadius: 3 }}
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="contained"
                color="primary"
              >
                Dashboard
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Button
                    sx={{ color: "white", borderRadius: 3 }}
                    LinkComponent={Link}
                    to="/blogs"
                    variant="contained"
                    color="primary"
                  >
                    All Blogs
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button
                    sx={{ color: "white", borderRadius: 3 }}
                    LinkComponent={Link}
                    to="/my-blogs"
                    variant="contained"
                    color="primary"
                  >
                    My Blogs
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button
                    sx={{ color: "white", borderRadius: 3 }}
                    LinkComponent={Link}
                    to="/create-blog"
                    variant="contained"
                    color="primary"
                  >
                    Create Blog
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          )}

          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white", borderRadius: 3 }}
                  LinkComponent={Link}
                  to="/login"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white", borderRadius: 3 }}
                  LinkComponent={Link}
                  to="/register"
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button
                onClick={handleLogout}
                sx={{ margin: 1, color: "white", borderRadius: 3 }}
                variant="contained"
                color="primary"
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
