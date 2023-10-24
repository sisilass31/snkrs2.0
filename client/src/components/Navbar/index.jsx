import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const Navigate = useNavigate();
  const hasToken = localStorage.getItem("token");

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    Navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span
              onClick={() => {
                Navigate("/")
                window.location.reload();
              }}
              style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
            >
              SNKRS
            </span>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {!hasToken ? null : (
              <span
                onClick={() => {
                  Navigate("/profile")
                  window.location.reload();
                }}
                style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
              >
                Profile
              </span>
            )}
          </Typography>

          {hasToken ? (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button
                  onClick={Logout}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Logout
                </Button>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <span
                  onClick={() => Navigate("/register")}
                  style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
                >
                  Register
                </span>
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <span
                  onClick={() => Navigate("/login")}
                  style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
                >
                  Login
                </span>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
