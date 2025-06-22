import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { logout } from "../../features/auth/authService";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          margin: "",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          ExpenseTracker
        </Typography>

        <div style={{ marginLeft: "auto", marginRight: 50 }}>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<ExitToApp />}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
